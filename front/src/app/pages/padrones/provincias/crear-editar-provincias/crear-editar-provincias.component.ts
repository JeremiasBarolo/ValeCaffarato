import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-crear-editar-provincias',
  templateUrl: './crear-editar-provincias.component.html',
  styleUrl: './crear-editar-provincias.component.css'
})
export class CrearEditarProvinciasComponent {
  breadcrumbItems: string = 'Crear/Editar Provincias'
  form: FormGroup;
  productos: any[] = [];
  id: number;
  tipo: any;
  listPaises: any[] = [];
  listProvincias: any[] = [];
  DataArticulos: any={}


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private paisesService: PaisesService,
    private provinciasService: ProvinciasService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
        name: ['',Validators.required],
        pais: ['',Validators.required],
        
    });
          
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities()
    

    if (this.id !== null) {
      this.getProduct(this.id);
    }  
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addPais() {
    
    this.tipo = {
      name: this.form.value.name,
      paisId: this.form.value.pais,
      
    }
    
    if (this.id !== 0) {
      this.provinciasService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/provincias']);
          this.toastr.success('Provincia Actualizada', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Provincia:', error);
          this.toastr.error('Hubo un problema al actualizar el Provincia. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.provinciasService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/provincias']);
          this.toastr.success('Provincia Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Condicion:', error);
          this.toastr.error('Hubo un problema al crear la Provincia. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.provinciasService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        
      this.form.setValue({      
        name: data.name,
        pais: data.paisId
      });
    });
}
  
  loadAllEntities() {
    this.paisesService.getAll().pipe(takeUntil(this.destroy$)).subscribe(provincia =>{
      this.listPaises = provincia
    })
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    this.form.patchValue({
      name: this.DataArticulos.name,
      pais: this.DataArticulos.paisId,
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PaisesService } from 'src/app/services/paises.service';


@Component({
  selector: 'app-crear-editar-paises',
  templateUrl: './crear-editar-paises.component.html',
  styleUrl: './crear-editar-paises.component.css'
})
export class CrearEditarPaisesComponent {
  breadcrumbItems: string = 'Crear/Editar Paises'
  form: FormGroup;
  productos: any[] = [];
  id: number;
  tipo: any;
  listLocalidades: any[] = [];
  listProvincias: any[] = [];
  DataArticulos: any={}


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private paisesService: PaisesService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
        name: ['',Validators.required],
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

  addCondicion() {
    
    this.tipo = {
      name: this.form.value.name,
    }
    
    if (this.id !== 0) {
      this.paisesService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/paises']);
          this.toastr.success('Pais Actualizado', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Pais:', error);
          this.toastr.error('Hubo un problema el actualizar el Pais. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.paisesService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/paises']);
          this.toastr.success('Pais Creado Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Pais:', error);
          this.toastr.error('Hubo un problema al crear el Pais. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.paisesService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        console.log(data);
        
      this.form.setValue({      
        name: data.name,
        
      });
    });
}
  
  loadAllEntities() {
    
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      name: this.DataArticulos.name,
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CondIvaService } from 'src/app/services/cond-iva.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-crear-editar-localidad',
  templateUrl: './crear-editar-localidad.component.html',
  styleUrl: './crear-editar-localidad.component.css'
})
export class CrearEditarLocalidadComponent {
  breadcrumbItems: string = 'Crear/Editar Localidades'
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
    private provinciasService: ProvinciasService,
    private localidadesService: LocalidadesService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
        name: ['',Validators.required],
        provincia: ['',Validators.required],
        codigo_postal: ['',Validators.required],
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
      provinciaId: this.form.value.provincia,
      codigo_postal: this.form.value.codigo_postal
    }
    
    if (this.id !== 0) {
      this.localidadesService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/localidades']);
          this.toastr.success('Localidad Actualizada', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Localidad:', error);
          this.toastr.error('Hubo un problema al actualizar el Localidad. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.localidadesService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/localidades']);
          this.toastr.success('Localidad Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Condicion:', error);
          this.toastr.error('Hubo un problema al crear la Localidad. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.localidadesService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        console.log(data);
        
      this.form.setValue({      
        name: data.name,
        provincia: data.provinciaId,
        codigo_postal: data.codigo_postal,
        
      });
    });
}
  
  loadAllEntities() {
    this.provinciasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(provincia =>{
      this.listProvincias = provincia
    })
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      name: this.DataArticulos.name,
      provincia: this.DataArticulos.provinciaId,
      codigo_postal: this.DataArticulos.codigo_postal,
    });
  }
}
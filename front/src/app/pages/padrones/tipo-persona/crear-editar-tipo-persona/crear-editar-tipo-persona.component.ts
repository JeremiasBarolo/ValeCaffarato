import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-crear-editar-tipo-persona',
  templateUrl: './crear-editar-tipo-persona.component.html',
  styleUrl: './crear-editar-tipo-persona.component.css'
})
export class CrearEditarTipoPersonaComponent {
  breadcrumbItems: string = 'Crear/Editar Tipo de Personas'
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
    private tipoPersonasService: TipoPersonaService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
      description: ['',Validators.required],
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
      description: this.form.value.description,
    }
    
    if (this.id !== 0) {
      this.tipoPersonasService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/tipo-personas']);
          this.toastr.success('Tipo Persona Actualizado', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Tipo Persona:', error);
          this.toastr.error('Hubo un problema el actualizar el Tipo Persona. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.tipoPersonasService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/tipo-personas']);
          this.toastr.success('Tipo Persona Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Tipo Persona:', error);
          this.toastr.error('Hubo un problema al crear el Tipo Persona. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.tipoPersonasService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        
      this.form.setValue({      
        description: data.description,
        
      });
    });
}
  
  loadAllEntities() {
    
  }

}
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-crear-editar-unidad',
  templateUrl: './crear-editar-unidad.component.html',
  styleUrl: './crear-editar-unidad.component.css'
})
export class CrearEditarUnidadComponent {
  breadcrumbItems: string = 'Crear/Editar Unidades de Medida'
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
    private unidadesService: UnidadMedidaService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
      descripcion: ['',Validators.required],
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
      descripcion: this.form.value.descripcion,
    }
    
    if (this.id !== 0) {
      this.unidadesService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/unidades-medida']);
          this.toastr.success('Unidad Actualizada', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Unidad:', error);
          this.toastr.error('Hubo un problema el actualizar la Unidad. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.unidadesService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/unidades-medida']);
          this.toastr.success('Unidad Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Unidad:', error);
          this.toastr.error('Hubo un problema al crear la Unidad. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.unidadesService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        
      this.form.setValue({      
        descripcion: data.descripcion,
        
      });
    });
}
  
  loadAllEntities() {
    
  }

}
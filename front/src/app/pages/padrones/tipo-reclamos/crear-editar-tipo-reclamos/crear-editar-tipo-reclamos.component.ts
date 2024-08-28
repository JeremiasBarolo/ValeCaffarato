import { Component } from '@angular/core';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoReclamosService } from 'src/app/services/tipo-reclamos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-editar-tipo-reclamos',
  templateUrl: './crear-editar-tipo-reclamos.component.html',
  styleUrl: './crear-editar-tipo-reclamos.component.css'
})
export class CrearEditarTipoReclamosComponent {
  breadcrumbItems: string = 'Crear/Editar Tipo de Reclamos'
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
    private tipoReclamoService: TipoReclamosService,
    private toastr: ToastrService,
    private location:Location
  ) {
    
    this.form = this.fb.group({
      des_reclamo: ['',Validators.required],
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
      des_reclamo: this.form.value.des_reclamo,
    }
    
    if (this.id !== 0) {
      this.tipoReclamoService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.goBack()
          this.toastr.success('Tipo Reclamo Actualizado', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Tipo Reclamo:', error);
          this.toastr.error('Hubo un problema el actualizar el Tipo Reclamo. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.tipoReclamoService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.goBack()
          this.toastr.success('Tipo Reclamo Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Tipo Reclamo:', error);
          this.toastr.error('Hubo un problema al crear el Tipo Reclamo. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.tipoReclamoService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        
      this.form.setValue({      
        des_reclamo: data.des_reclamo,
        
      });
    });
}
  
  loadAllEntities() {
    
  }

  goBack(){
    this.location.back();
  }

}
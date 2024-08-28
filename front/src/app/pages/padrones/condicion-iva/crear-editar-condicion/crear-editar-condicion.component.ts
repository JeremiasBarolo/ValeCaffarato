import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BancosService } from 'src/app/services/bancos.service';
import { CondIvaService } from 'src/app/services/cond-iva.service';


@Component({
  selector: 'app-crear-editar-condicion',
  templateUrl: './crear-editar-condicion.component.html',
  styleUrl: './crear-editar-condicion.component.css'
})
export class CrearEditarCondicionComponent {
  breadcrumbItems: string = 'Crear/Editar Condiciones de Iva'
  form: FormGroup;
  productos: any[] = [];
  id: number;
  tipo: any;
  listLocalidades: any[] = [];


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private condService: CondIvaService,
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
      this.condService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/condicion-iva']);
          this.toastr.success('Condiciona Actualizada', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Condicion:', error);
          this.toastr.error('Hubo un problema al actualizar el Condicion. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.condService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.router.navigate(['dashboard/condicion-iva']);
          this.toastr.success('Condicion Creada Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Condicion:', error);
          this.toastr.error('Hubo un problema al crear la Condicion. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.condService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        console.log(data);
        
      this.form.setValue({    
        description: data.description,
      });
    });
}
  
  loadAllEntities() {
    
  }
}

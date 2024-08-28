import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ReclamosService } from 'src/app/services/reclamos.service';
import { TipoReclamosService } from 'src/app/services/tipo-reclamos.service';

@Component({
  selector: 'app-crear-editar-reclamo-compra',
  templateUrl: './crear-editar-reclamo-compra.component.html',
  styleUrl: './crear-editar-reclamo-compra.component.css'
})
export class CrearEditarReclamoCompraComponent {
  breadcrumbItems: string = 'Crear/Editar Reclamo de Compra'
  form: FormGroup;
  productos: any[] = [];
  id: number;
  tipo: any;
  listLocalidades: any[] = [];
  listProvincias: any[] = [];
  DataArticulos: any={}
  pedidos: any[] = [];
  tipoReclamos: any[] = [];


  private destroy$ = new Subject<void>();
  personaId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private reclamosService: ReclamosService,
    private tipoReclamosService: TipoReclamosService,
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private location:Location
  ) {
    
    this.form = this.fb.group({
        detalles_reclamo: ['',Validators.required],
        pedidoId: ['',Validators.required],
        tipoReclamoId: ['',Validators.required],
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
      detalles_reclamo: this.form.value.detalles_reclamo,
      pedidoId: this.form.value.pedidoId,
      tipoReclamoId: 1, //Compra
    }
    
    if (this.id !== 0) {
      this.reclamosService.update(this.id, {...this.tipo, personaId: this.personaId}).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.goBack()
          this.toastr.success('Reclamo Actualizado', 'Éxito');
        },
        error: (error) => {
          console.error('Error al actualizar el Reclamo:', error);
          this.toastr.error('Hubo un problema el actualizar el Reclamo. Intenta nuevamente.', 'Error');
        }
      });
    } else {
      this.reclamosService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.goBack()
          this.toastr.success('Reclamo Creado Exitosamente', 'Éxito');
        },
        error: (error) => {
          console.error('Error al crear el Reclamo:', error);
          this.toastr.error('Hubo un problema al crear el Reclamo. Intenta nuevamente.', 'Error');
        }
      });
    }
}

  getProduct(id: number) {
    this.reclamosService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
      this.personaId = data.id_persona
        
      this.form.setValue({
        detalles_reclamo: data.detalles_reclamo,
        pedidoId: data.pedidoId,
        personaId: data.personaId,
        tipoReclamoId: data.tipoReclamoId,      
      });
    });
}
  
  loadAllEntities() {
    this.tipoReclamosService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.tipoReclamos = data;
    });

    this.pedidosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data=> {
      
      data.forEach((element:any) =>{
        console.log(element);
        if(element.category === 'COMPRA' && element.Reclamos.length === 0){
          this.pedidos.push(element) 
        }
      }) 
    
    })
    
    

  }

  goBack() {
    this.location.back()
  }

  
}
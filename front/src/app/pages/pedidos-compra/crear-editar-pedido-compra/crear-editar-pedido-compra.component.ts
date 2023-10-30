import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InsumoEntity } from 'src/app/models/insumo-entity';
import { PedidoCompra } from 'src/app/models/pedidoCompra';
import { CompraPresupuestoService } from 'src/app/services/compra-presupuesto.service';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-pedido-compra',
  templateUrl: './crear-editar-pedido-compra.component.html',
  styleUrls: ['./crear-editar-pedido-compra.component.css']
})
export class CrearEditarPedidoCompraComponent {
  PedidoCompra: PedidoCompra | any;
  listPedidoCompras: Observable<PedidoCompra[]> = new Observable<PedidoCompra[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  PedidoCompraData: PedidoCompra | any;
  InsumosEntities: InsumoEntity[] = [];
  selectedEntities: InsumoEntity[] = [];
  selectedIds: any[] = [];
  subtotal: any[] =[]
  


  constructor(
    private insumosEntityService: InsumoEntityService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private compraPresupuestoService: CompraPresupuestoService,
    private titleService: TitleService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
    if (this.id !== null) {
      this.operacion = 'Editar';
      console.log(this.operacion);
      
      this.titleService.setTitle('Editar PedidoCompras');
      console.log(this.id);
      
      this.getPedidoCompra(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear PedidoCompras');
      
    } 
    
    
    this.loadAllEntities()
    this.loadSelectedProducts()
  }

  addPedidoCompra() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);

      this.selectedEntities.forEach((entity: InsumoEntity) => {
        this.selectedIds.push(entity.id);
        this.subtotal.push(entity.price);
      })

      
      
      console.log(this.subtotal);
      
      this.PedidoCompra = {
        name: this.form.value.name,
        description: this.form.value.description,
        subtotal: this.subtotal.reduce((acc, price) => acc + price, 0),
        insumosEntity_id:this.selectedIds
      };
      if (this.id !== 0) {
        // Es editar
        try {
          this.compraPresupuestoService.update(this.id, this.PedidoCompra).subscribe(() => {
            this.router.navigate(['dashboard/pedidos-compra']);
            this.toastr.success('Pedido Actualizado');
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          console.log(this.PedidoCompra);
          
          this.compraPresupuestoService.create(this.PedidoCompra).subscribe(() => {
            this.router.navigate(['dashboard/pedidos-compra']);
            this.toastr.success('Pedido Creado Exitosamente');
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getPedidoCompra(id: number) {
    this.compraPresupuestoService.getById(id).subscribe((data: PedidoCompra)=> {
      let PedidoCompra: PedidoCompra = {
        id: data.id,
        name: data.name,
        description: data.description,
        subtotal: data.subtotal
      };


      data.InsumosEntities?.length === 0
      ? data.InsumosEntities?.forEach((entity: InsumoEntity) => {
          this.selectedEntities.push(entity);
        })
      :null


      this.PedidoCompraData = PedidoCompra;

      this.form.setValue({
        name: data.name,
        description: data.description,
        
      });
      
    });
  }

  selectedEntity(InsumoEntity: InsumoEntity) {
    this.selectedEntities.push(InsumoEntity);
  
    const index = this.InsumosEntities.findIndex(p => p.id === InsumoEntity.id);
    if (index !== -1) {
      this.InsumosEntities.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  }
  
  returnEntities(Entities: InsumoEntity) {
    this.InsumosEntities.push(Entities);
    const index = this.selectedEntities.findIndex(p => p.id === Entities.id);
    if (index !== -1) {
      this.selectedEntities.splice(index, 1);
    }
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Super pedido de Cajas',
        description: 'Cajones negros'
        
    });
  }

  loadSelectedProducts() {
    if (this.id) {
      this.compraPresupuestoService.getById(this.id).subscribe(
        (res: any) => {
          if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
            this.selectedEntities = [...res.InsumosEntities];
            this.InsumosEntities = this.InsumosEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      )
    }
  }

  loadAllEntities() {
    this.insumosEntityService.getAll().subscribe((data) => {
      this.InsumosEntities = data.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })
  }
}

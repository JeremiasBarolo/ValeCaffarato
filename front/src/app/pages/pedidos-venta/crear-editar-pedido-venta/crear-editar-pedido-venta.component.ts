import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InsumoEntity } from 'src/app/models/insumo-entity';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { ProductEntity } from 'src/app/models/product-entity';

import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductEntityService } from 'src/app/services/product-entity.service';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-crear-editar-pedido-venta',
  templateUrl: './crear-editar-pedido-venta.component.html',
  styleUrls: ['./crear-editar-pedido-venta.component.css']
})
export class CrearEditarPedidoVentaComponent {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  selectedEntities: ProductEntity[] = [];
  ProductEntities: ProductEntity[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
    name: '',
    description: '',
    state: 'PRESUPUESTADO',
    category: 'VENTA',
    subtotal: 0,
    productos: [],
  };

  constructor(
    private productEntityService: ProductEntityService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private pedidosService: PedidosService,
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
    this.loadAllEntities();
    this.loadSelectedProducts();
    this.titleService.setTitle('Pedidos Compra');
    console.log(this.selectedEntities);
    console.log(this.ProductEntities);

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.quantity }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;

    if (this.id !== 0) {
      try {
        this.pedidosService.update(this.id, this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-compra']);
          this.toastr.success('Pedido Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.pedidosService.create(this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-compra']);
          this.toastr.success('Pedido Creado Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  selectedEntity(insumoEntity: ProductEntity) {
    insumoEntity.quantity = 1;
    this.selectedEntities.push(insumoEntity);
  
    const index = this.ProductEntities.findIndex(p => p.id === insumoEntity.id);
    if (index !== -1) {
      this.ProductEntities.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  
  }

  
  returnEntities(Entities: ProductEntity) {
    this.ProductEntities.push(Entities);
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
  loadAllEntities() {
    this.productEntityService.getAll().subscribe((data) => {
      this.ProductEntities = data.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })
  }
  loadSelectedProducts() {
    if (this.id) {
      this.pedidosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
            this.selectedEntities = [...res.InsumosEntities];
            this.ProductEntities = this.ProductEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      )
    }
  }
}

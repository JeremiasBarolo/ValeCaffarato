import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InsumoEntity } from 'src/app/models/insumo-entity';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-pedidos-compra',
  templateUrl: './crear-editar-pedidos-compra.component.html',
  styleUrls: ['./crear-editar-pedidos-compra.component.css']
})
export class CrearEditarPedidosCompraComponent {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  selectedEntities: InsumoEntity[] = [];
  InsumosEntities: InsumoEntity[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
    name: '',
    description: '',
    state: 'PRESUPUESTADO',
    category: 'COMPRA',
    subtotal: 0,
    insumosEntity_id: [],
  };

  constructor(
    private insumosEntityService: InsumoEntityService,
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
    console.log(this.InsumosEntities);

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.insumosEntity_id = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }));
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

  selectedEntity(insumoEntity: InsumoEntity) {
    insumoEntity.cantidad = 1;
    this.selectedEntities.push(insumoEntity);
  
    const index = this.InsumosEntities.findIndex(p => p.id === insumoEntity.id);
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
  loadAllEntities() {
    this.insumosEntityService.getAll().subscribe((data) => {
      this.InsumosEntities = data.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })
  }
  loadSelectedProducts() {
    if (this.id) {
      this.pedidosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
            this.selectedEntities = [...res.InsumosEntities];
            this.InsumosEntities = this.InsumosEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      )
    }
  }

  
  

  
  
  
}

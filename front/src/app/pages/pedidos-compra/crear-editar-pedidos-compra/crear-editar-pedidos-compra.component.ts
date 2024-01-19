import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { MonedasService } from 'src/app/services/monedas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-pedidos-compra',
  templateUrl: './crear-editar-pedidos-compra.component.html',
  styleUrls: ['./crear-editar-pedidos-compra.component.css']
})
export class CrearEditarPedidosCompraComponent {
  PedidoCompra: Pedidos | any;
  monedas: any[] = []
  form: FormGroup;
  id: number;
  selectedEntities: any[] = [];
  InsumosEntities: any[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
    name: '',
    description: '',
    state: 'PRESUPUESTADO',
    category: 'COMPRA',
    subtotal: 0,
    insumosEntity_id: [],
    monedaId:0
  };

  constructor(
    private maestroArticulosService: MaestroArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private monedasService: MonedasService,
    private titleService: TitleService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      moneda: ['', Validators.required]
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities();
    this.loadSelectedProducts();
    if (this.id !== null) {
      this.titleService.setTitle('Editar Pedido de Compra');
      console.log(this.id);
      this.getPedido(this.id);
    }else{
      this.titleService.setTitle('Pedidos Compra');
    }

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;
    this.presupuestoData.id = this.id;
    this.presupuestoData.monedaId = this.form.value.moneda;

console.log(this.presupuestoData.monedaId);

    if (this.id !== 0) {
      try {
        this.pedidosService.update(this.id, {...this.presupuestoData, editPresupuesto: true}).subscribe(() => {
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

  selectedEntity(insumoEntity: any) {
    insumoEntity.cantidad = 1;
    this.selectedEntities.push(insumoEntity);
  
    const index = this.InsumosEntities.findIndex(p => p.id === insumoEntity.id);
    if (index !== -1) {
      this.InsumosEntities.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  
  }

  
  returnEntities(Entities: any) {
    this.InsumosEntities.push(Entities);
    const index = this.selectedEntities.findIndex(p => p.id === Entities.id);
    if (index !== -1) {
      this.selectedEntities.splice(index, 1);
    }
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Super pedido de Cajas',
        description: 'Cajones negros',
        moneda: 1
        
    });
  }
  loadAllEntities() {
    this.maestroArticulosService.getAll().subscribe((data) => {
      data.forEach((insumo: any) => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.InsumosEntities.push(insumo);
        }
      })
      this.InsumosEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })

    this.monedasService.getAll().subscribe((data)=>{
      this.monedas= data
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

  getPedido(id: number) {
    this.pedidosService.getById(id).subscribe((data: any)=> {
      
      this.form.setValue({
        name: data.name,
        description: data.description,
        moneda: data.monedaId
      });
    });
  }

  
  

  
  
  
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
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
  selectedEntities: any[] = [];
  ProductEntities: any[] = [];
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
    private maestroArticulosService: MaestroArticulosService,
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
    if (this.id !== 0) {
      this.titleService.setTitle('Editar Pedidos Venta');
      this.getPedido(this.id);

    }else{
      this.titleService.setTitle('Crear Pedidos Venta');
    }
    
    

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.quantity }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;
    this.presupuestoData.id = this.id;

    if (this.id !== 0) {
      try {
        this.pedidosService.update(this.id, {...this.presupuestoData, editPresupesto: true}).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-venta']);
          this.toastr.success('Pedido Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.pedidosService.create(this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-venta']);
          this.toastr.success('Pedido Creado Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  selectedEntity(articulo: any) {
    articulo.quantity = 1;
    this.selectedEntities.push(articulo);
  
    const index = this.ProductEntities.findIndex(p => p.id === articulo.id);
    if (index !== -1) {
      this.ProductEntities.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  
  }

  
  returnEntities(Entities: any) {
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
    this.maestroArticulosService.getAll().subscribe((data) => {
      data.forEach((insumo: any) => {
        if(insumo.tipoArticulo === 'PRODUCTO'){
          this.ProductEntities.push(insumo);
        }
      })
      this.ProductEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
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
  getPedido(id: number) {
    this.pedidosService.getById(id).subscribe((data: any)=> {
    
      this.form.setValue({
        name: data.name,
        description: data.description,
      });
    });
  }
}

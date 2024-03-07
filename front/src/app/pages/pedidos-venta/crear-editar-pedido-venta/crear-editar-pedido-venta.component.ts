import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { MonedasService } from 'src/app/services/monedas.service';
import { PedidosService } from 'src/app/services/pedidos.service';


@Component({
  selector: 'app-crear-editar-pedido-venta',
  templateUrl: './crear-editar-pedido-venta.component.html',
  styleUrls: ['./crear-editar-pedido-venta.component.css']
})
export class CrearEditarPedidoVentaComponent {
  breadcrumbItems: string = 'Crear/Editar Pedidos Venta'
  PedidoCompra: Pedidos | any;
  monedas: any[] = []
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
    private monedasService: MonedasService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      moneda: ['', Validators.required],
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id !== null) {
      this.loadAllEntities();
      for (let i = 0; i < 2; i++){
        setTimeout(() => {
          
          this.loadSelectedProducts();
        }, 50)
      }

      console.log(this.id);
      this.getPedido(this.id);
    }else{

      
      this.loadAllEntities();
    }
    
    

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.quantity }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;
    this.presupuestoData.id = this.id;
    this.presupuestoData.monedaId = this.form.value.moneda;

    if (this.id !== 0) {
      try {
        this.pedidosService.update(this.id, {...this.presupuestoData, editPresupuesto: true}).subscribe(() => {
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

    this.monedasService.getAll().subscribe((data)=>{
      this.monedas= data
    })
  }


  loadSelectedProducts() {
    if (this.id) {
      this.pedidosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.productos && res.productos.length > 0) {
            this.selectedEntities = res.productos.map((entidad: { PedidosProductos: { quantity_requested: any; }; }) => {
              return {
                ...entidad,
                quantity: entidad.PedidosProductos ? entidad.PedidosProductos.quantity_requested : 0
              };
            });
  
            this.ProductEntities = this.ProductEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      );
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




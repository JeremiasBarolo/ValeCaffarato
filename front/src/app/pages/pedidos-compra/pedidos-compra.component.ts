import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from 'src/app/models/pedidos';

import { InsumoService } from 'src/app/services/insumo.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos-compra.component.html',
  styleUrls: ['./pedidos-compra.component.css']
})
export class PedidosCompraComponent implements OnInit {
  botonDeshabilitado = false;
  listPresupuesto: Pedidos[] = [];
  listAprobado: Pedidos[] = [];
  listCancelado: Pedidos[] = [];
  listFinalizado: Pedidos[] = [];
  subtotal: number = 0

  cardData: any = {
    name: ''
  }
  cardDataGeneral: any = {
    name: ''
  }  
  IdsInsumosCantidad: any[] = []

  constructor(
    private titleService: TitleService,
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private insumoService: InsumoService


    ) { }


  ngOnInit(): void {
    this.titleService.setTitle('Pedidos Compra');
    this.pedidosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.state === 'PRESUPUESTADO' && element.category === 'COMPRA'){
            this.listPresupuesto.push(element);
          }else if(element.state === 'APROBADO' && element.category === 'COMPRA'){
            this.listAprobado.push(element);
          }else if(element.state === 'CANCELADO' && element.category === 'COMPRA'){
            this.listCancelado.push(element);
          }else if(element.state === 'FINALIZADO' && element.category === 'COMPRA'){
            this.listFinalizado.push(element);
          }
        }
      )
    });
    
    this.route.paramMap.subscribe((params) => {
      this.viewport.scrollToPosition([0,0]);
    });
    console.log(this.listPresupuesto);
    
  }

  cambiarEstado(id?: number, pedido?: any, estado?: string) {
    this.botonDeshabilitado = true;
    if (id){
    pedido.state = estado;


    if(estado === 'APROBADO'){

      pedido.subtotal = this.calcularSubtotal(pedido);
      this.pedidosService.update(id, pedido).subscribe(() => {
      this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
      setTimeout(() => {
        window.location.reload();
      }, 600)
    })

    }
else if(estado === 'FINALIZADO'){

      this.insumoService.create(pedido.productos).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} ${estado} con Exito`)

      });
      this.pedidosService.update(id, pedido).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 100)
      })
      this.router.navigate(['dashboard/insumos']);


    }else{

      this.pedidosService.update(id, pedido).subscribe(() => {
      this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }
      
    
    )}
    }
      
  }

  
showCardDetails(card: Pedidos) {  
  this.cardData = card;  
  console.log(this.cardData);
}

updateEntidad(id:number){
  this.router.navigate(['dashboard/pedidos-compra/crear-editar', id]);
}

calcularSubtotal(pedido: any): number {
  let subtotal = 0;

  if (pedido.productos && pedido.productos.length > 0) {
    subtotal = pedido.productos.reduce((acc: number, producto: { PedidosProductos: { quantity_requested: number; }; costo_unit: number; profit: number; }) => {
      let precioUnitario = producto.costo_unit * producto.PedidosProductos.quantity_requested;
      let ganancia = precioUnitario * (producto.profit / 100);
      return acc + precioUnitario + ganancia;
    }, 0);
  }

  return subtotal;
}


eliminarPedido(id?: number){
  this.pedidosService.delete(id!).subscribe(() => {
    this.toastr.success('Entidad eliminado exitosamente')
    setTimeout(() => {
      window.location.reload();
    }, 600)
    

  })
}


}
  

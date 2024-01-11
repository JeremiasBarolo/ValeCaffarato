import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from 'src/app/models/pedidos';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-pedidos-venta',
  templateUrl: './pedidos-venta.component.html',
  styleUrls: ['./pedidos-venta.component.css']
})
export class PedidosVentaComponent {
  listPresupuesto: Pedidos[] = [];
  listAprobado: Pedidos[] = [];
  listCancelado: Pedidos[] = [];
  listFinalizado: Pedidos[] = [];
  listPreparacion: Pedidos[] = [];
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
    private productosService: ProductosEnStockService,



    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Pedidos Venta');
    this.pedidosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.state === 'PRESUPUESTADO' && element.category === 'VENTA'){
            this.listPresupuesto.push(element);
          }else if(element.state === 'APROBADO' && element.category === 'VENTA'){
            this.listAprobado.push(element);
          }else if(element.state === 'CANCELADO' && element.category === 'VENTA'){
            this.listCancelado.push(element);
          }else if(element.state === 'PREPARACION' && element.category === 'VENTA'){
            this.listPreparacion.push(element);
          }else if(element.state === 'FINALIZADO' && element.category === 'VENTA'){
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

cambiarEstado(id?: number, pedido?: any, estado?: string, devolverInsumos?: any) {
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
    
    else if(estado === 'PREPARACION'){

      this.pedidosService.update(id, pedido).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
  }
    else if(estado === 'FINALIZADO'){

      this.productosService.create(pedido.productos).subscribe(() => {
      });
      this.pedidosService.update(id, pedido).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
        
      })

      


      this.router.navigate(['dashboard/productos']);


    }else{

      this.pedidosService.update(id, {...pedido, devolverInsumos:devolverInsumos}).subscribe(() => {
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
  this.router.navigate(['dashboard/pedidos-venta/crear-editar', id]);
}

calcularSubtotal(pedido: any): number {
  let subtotal = 0;

  if (pedido.productos && pedido.productos.length > 0) {
    subtotal = pedido.productos.reduce((acc: number, producto: {
      costo_unit: any;
      PedidosProductos: any; PedidosInsumos: { quantity_requested: number; }; price: number; 
}) => {
      return acc + producto.PedidosProductos.quantity_requested * producto.costo_unit;
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

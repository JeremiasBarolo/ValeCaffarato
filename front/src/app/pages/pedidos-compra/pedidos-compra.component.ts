import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from 'src/app/models/pedidos';

import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { PedidosService } from 'src/app/services/pedidos.service';

import { DepositosService } from 'src/app/services/depositos.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos-compra.component.html',
  styleUrls: ['./pedidos-compra.component.css']
})
export class PedidosCompraComponent implements OnInit {
  botonDeshabilitado = false;
  breadcrumbItems: string = 'Pedidos Compra'
  listPresupuesto: Pedidos[] = [];
  listAprobado: Pedidos[] = [];
  listCancelado: Pedidos[] = [];
  listFinalizado: Pedidos[] = [];
  subtotal: number = 0
  cardData: any = {}
  cardDataGeneral: any = {}  
  IdsInsumosCantidad: any[] = []
  depositos: any[] = [] 
  selectedDepositoId: number | undefined;
  private destroy$ = new Subject<void>();
  

  constructor(
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private productosEnStockService: ProductosEnStockService,
    private depositosService : DepositosService


    ) { }


  ngOnInit(): void {
    this.pedidosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
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

    this.depositosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.depositos = data;
    });
    
    
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.viewport.scrollToPosition([0,0]);
    });
    
    
  }

  cambiarEstado(id?: number, pedido?: any, estado?: string, selectedId?: number) {
    this.botonDeshabilitado = true;
    if (id){
    pedido.state = estado;


    if(estado === 'APROBADO'){

      pedido.subtotal = this.calcularSubtotal(pedido);
      this.pedidosService.update(id, pedido).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
      setTimeout(() => {
        window.location.reload();
      }, 600)
    })

    }
    else if(estado === 'FINALIZADO'){

      

          this.productosEnStockService.create({productos: pedido.productos, type: 'INSUMO', depositoId: selectedId }).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.toastr.success(`Pedido ${pedido.name} ${estado} con Exito`)

          });
          this.pedidosService.update(id, pedido).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.toastr.success(`Pedido ${pedido.name} ${estado} exitosamente`)
            setTimeout(() => {
              window.location.reload();
            }, 100)
          })
          


    }else{

      this.pedidosService.update(id, pedido).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
  
}

updateEntidad(id:any){
  this.router.navigate(['dashboard/pedidos-compra/crear-editar', id]);
}

calcularSubtotal(pedido: any): number {
  let subtotal = 0;

  if (pedido.productos && pedido.productos.length > 0) {
    subtotal = pedido.productos.reduce((acc: number, producto: any) => {
      
      let totalProducto = producto.costo_unit * producto.PedidosProductos.quantity_requested;

    
      return acc + totalProducto;
    }, 0);
  }

  return subtotal;
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}


eliminarPedido(id?: number, state?:any){

  if(state ==='FINALIZADO'){
    this.pedidosService.update(id!, { eliminarCantidad: true })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
       
  
        if (res.action === true) {
          this.toastr.info(res.message);
        } else {
          this.toastr.success('Entidad eliminada exitosamente');
          setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      },
      error: (error) => {
        console.error('Error recibido:', error); 
        this.toastr.error(error.error.error
          || 'Ocurrió un error inesperado al eliminar el pedido.');
      }
    });
  
  }else{
    this.pedidosService.delete(id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success('Entidad eliminado exitosamente')
      setTimeout(() => {
        window.location.reload();
      }, 600)
    })
  }
  
}

onAceptarClick() {
  this.cambiarEstado(this.cardData.id, this.cardData, 'FINALIZADO', this.selectedDepositoId);
}

navigateToDetalle(id: any) {
  this.router.navigate(['/dashboard/detalle-pedido', id]);
}

}
  

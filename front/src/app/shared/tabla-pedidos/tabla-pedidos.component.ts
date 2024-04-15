import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrl: './tabla-pedidos.component.css'
})
export class TablaPedidosComponent {
  pedido:any
  id:any
  filteredProducto:any
  


  constructor(
    private pedidoService: PedidosService,
    private router: Router,
    private aRoute: ActivatedRoute,

  ) {

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.pedidoService.getById(this.id).subscribe((data)=>{
      this.pedido = data;
      this.filteredProducto = this.pedido.productos;
    })


  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProducto = this.pedido.productos.filter((insumo: { name: string; }) => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }


  calcularSubtotal(pedido: any): number {
    let subtotal = 0;
  
    if(pedido?.category === 'COMPRA'){
      if (pedido?.productos && pedido.productos.length > 0) {
        subtotal = pedido.productos?.reduce((acc: number, producto: any) => {
          
          let totalProducto = producto.costo_unit * producto.PedidosProductos.quantity_requested;
    
        
          return acc + totalProducto;
        }, 0);
      }
    
      return subtotal;
    }else{
     
        let subtotal = 0;
      
        if (pedido.productos && pedido.productos.length > 0) {
          subtotal = pedido.productos.reduce((acc: number, producto: any) => {
            
            let precioUnitario = producto.costo_unit * producto.PedidosProductos.quantity_requested;
            
            let ganancia = precioUnitario * (producto.profit / 100);
            
            return acc + precioUnitario + ganancia;
          }, 0);
        }
      
        return subtotal;
      }
    }

    
}



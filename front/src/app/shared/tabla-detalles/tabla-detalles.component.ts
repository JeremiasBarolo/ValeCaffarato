import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';

@Component({
  selector: 'app-tabla-detalles',
  templateUrl: './tabla-detalles.component.html',
  styleUrl: './tabla-detalles.component.css'
})
export class TablaDetallesComponent implements OnInit {
  pedido:any
  id:any
  filteredProducto:any
  


  constructor(
    private productoService: MaestroArticulosService,
    private router: Router,
    private aRoute: ActivatedRoute,

  ) {

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.productoService.getById(this.id).subscribe((data)=>{
      this.pedido = data;
      this.filteredProducto = this.pedido.ProductosEnStocks;
    })


  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProducto = this.pedido.ProductosEnStocks.filter((insumo: { name: string; }) => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }


}

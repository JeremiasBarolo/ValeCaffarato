import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PedidosService } from 'src/app/services/pedidos.service';


@Component({
  selector: 'app-factura-remito',
  templateUrl: './factura-remito.component.html',
  styleUrls: ['./factura-remito.component.css']
})
export class FacturaRemitoComponent implements OnInit {
  id: number;
  documentoData: any = {}
  productData: any = []
  subtotal: any[] = []
  constructor(
    private documentosService: DocumentosService, 
    private aRoute: ActivatedRoute, 
    private pedidosService: PedidosService
    ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));

  }
  
    
  ngOnInit(): void {

    this.documentosService.getById(this.id).subscribe(data =>{
      this.documentoData = data;
      console.log(this.documentoData);
      this.documentoData.Pedidos.forEach((element: any) => {
        this.pedidosService.getById(element.id).subscribe(data =>{
          this.productData.push(data.productos);
          console.log(this.productData);
          
        })
      })
    })
    console.log('productos:', this.productData);
    
  }

  calcularTotal(precio: number, cantidad: number){
    let total= 0
    total = precio*cantidad
    return total
  }

  totalIva(precio: number, cantidad: number, iva: number){
    let total= 0
    let totalIva = 0

    total = precio*cantidad
    totalIva = (total*iva)/100 + total
    this.subtotal.push(totalIva)
    return totalIva
  }

  subtotalReal(){
    
    const suma = this.subtotal.reduce((acumulador, numero) => acumulador + numero, 0);
    return suma
  }


}

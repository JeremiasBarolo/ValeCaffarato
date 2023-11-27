import { Component } from '@angular/core';
import { DocumentosService } from 'src/app/services/documentos.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent {
  facturas: any[] = [];
  remitos: any[] = [];
  cardData: any = {
    name: ''
  };

 constructor(private documentosService: DocumentosService ) {}

  pedido: any = {};

  ngOnInit() {
    this.documentosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.tipo === 'FACTURA' ){
            this.facturas.push(element);
          }else if(element.tipo === 'REMITO'){
            this.remitos.push(element);
          }
        }
      ) 
    })
    console.log(this.facturas, this.remitos);
    
  }


showCardDetails(card: any) {  
  this.cardData = card;  
  console.log(this.cardData);
}
}

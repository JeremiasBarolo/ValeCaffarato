import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-facturas',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  @ViewChild('myModal')
  myModal!: ElementRef;

 constructor(private documentosService: DocumentosService ) {}

  pedido: any = {};
  facturas: any[] = [];
  remitos: any[] = [];
  cardData: any = {
    tipo: '',
    totalIva: 0,
    total: 0,
    iva: 0,
    condicionIva: '',
    id: 0,
    createdAt: ''
  };

  ngOnInit() {
    this.documentosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.tipo === 'REMITO'){
            this.remitos.push(element);
          }else if(element.tipo === 'FACTURA' ){
            this.facturas.push(element);
          }
        }
      )
    });
    
  }


  showCardDetails(card: any) {  
    this.cardData = card;  
    console.log(this.cardData);
    // Open the modal programmatically
    this.myModal.nativeElement.click();
  }

borrarFactura(id: any){
  this.documentosService.delete(id).subscribe(() => {
    this.facturas = this.facturas.filter(e => e.id !== id);
  });
}
}

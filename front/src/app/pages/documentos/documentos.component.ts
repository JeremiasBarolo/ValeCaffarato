import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-facturas',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  breadcrumbItems: string = 'Documentos'
  @ViewChild('myModal')
  myModal!: ElementRef;

 constructor(private documentosService: DocumentosService ) {}

  pedido: any = {};
  facturas: any[] = [];
  remitos: any[] = [];
  cardData: any = {};
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.documentosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  showCardDetails(card: any) {  
    this.cardData = card;  
    console.log(this.cardData);
    this.myModal.nativeElement.click();
  }

borrarFactura(id: any){
  this.documentosService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.facturas = this.facturas.filter(e => e.id !== id);
  });
}
}

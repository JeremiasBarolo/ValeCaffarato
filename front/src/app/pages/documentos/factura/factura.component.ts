import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  breadcrumbItems: string = 'Facturas'
  @ViewChild('myModal')
  myModal!: ElementRef;

 constructor(private documentosService: DocumentosService,private router:Router ) {}
  pedido: any = {};
  facturas: any[] = [];
  remitos: any[] = [];
  cardData: any = {};
  private destroy$ = new Subject<void>();

  

  ngOnInit() {
    this.documentosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.tipo === 'FACTURA' ){
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
    this.router.navigate(['dashboard/facturas/detalle', card.id]);
  }

  borrarFactura(id: any){
    this.documentosService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.facturas = this.facturas.filter(e => e.id !== id);
    });
  }

  

 
}
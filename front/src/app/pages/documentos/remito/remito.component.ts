import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrl: './remito.component.css'
})
export class RemitoComponent {
  breadcrumbItems: string = 'Remitos'
  myModal!: ElementRef;

 constructor(private documentosService: DocumentosService,private router:Router ) {}
  pedido: any = {};
  remitos: any[] = [];
  cardData: any = {};
  private destroy$ = new Subject<void>();

  

  ngOnInit() {
    this.documentosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.tipo === 'REMITO' ){
            this.remitos.push(element);
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
      this.remitos = this.remitos.filter(e => e.id !== id);
    });
  }

  

 
}

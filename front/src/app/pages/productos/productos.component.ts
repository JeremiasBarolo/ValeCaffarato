import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  entidades: any[] = []
  breadcrumbItems: string = 'Stock PT'
  cardData: any = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,

  }
  filteredProductos:any[] = []
  private destroy$ = new Subject<void>();

  constructor(
    private productoService: ProductosEnStockService,
    private router: Router
    ) {
    
  }
  
  ngOnInit(): void {
    this.productoService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
      data.forEach(element => {
        if(element.type === "PRODUCTO"){
          this.entidades.push(element)
          this.filteredProductos = this.entidades;
        }
      })
      
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  deleteEntidad(id: any) {
    this.productoService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }


  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProductos = this.entidades.filter(insumo => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  

}

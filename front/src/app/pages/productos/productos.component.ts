import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private productoService: ProductosEnStockService,
    private router: Router
    ) {
    
  }
  
  ngOnInit(): void {
    this.productoService.getAll().subscribe(data =>{
      data.forEach(element => {
        if(element.type === "PRODUCTO"){
          this.entidades.push(element)
          this.filteredProductos = this.entidades;
        }
      })
      
    })
  }
  deleteEntidad(id: any) {
    this.productoService.delete(id).subscribe(() => {
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

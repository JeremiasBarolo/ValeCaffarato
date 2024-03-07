import { Component } from '@angular/core';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  entidades: any[] = []
  breadcrumbItems: string = 'Productos En Stock'
  cardData: any = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,

  }
  constructor(
    private productoService: ProductosEnStockService
    ) {
    
  }
  
  ngOnInit(): void {
    this.productoService.getAll().subscribe(data =>{
      data.forEach(element => {
        if(element.type === "PRODUCTO"){
          this.entidades.push(element)
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
    console.log(this.cardData);
    
  }
}

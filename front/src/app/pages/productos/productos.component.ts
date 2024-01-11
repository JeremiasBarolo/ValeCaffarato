import { Component } from '@angular/core';

import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  entidades: any[] = []
  cardData: any = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,

  }
  constructor(
    private titleService: TitleService, 
    private productoService: ProductosEnStockService
    ) {
    
  }
  
  ngOnInit(): void {
    this.productoService.getAll().subscribe(data =>{
      this.entidades = data
    });
    this.titleService.setTitle('Productos en Stock');
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

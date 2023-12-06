import { Component } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { InsumoService } from 'src/app/services/insumo.service';
import { ProductosService } from 'src/app/services/productos.service';
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
    private productoService: ProductosService
    ) {
    
  }
  
  ngOnInit(): void {
    this.productoService.getAll().subscribe(insumos => this.entidades = insumos);
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

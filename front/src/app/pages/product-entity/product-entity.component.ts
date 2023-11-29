import { Component } from '@angular/core';
import { ProductEntity } from 'src/app/models/product-entity';
import { ProductEntityService } from 'src/app/services/product-entity.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-product-entity',
  templateUrl: './product-entity.component.html',
  styleUrls: ['./product-entity.component.css']
})
export class ProductEntityComponent {
  entidades: ProductEntity[] = []
  cardData: any = {
    name: '',
  }
  constructor(private titleService: TitleService, private productEntityService: ProductEntityService) {
    
  }

  
  ngOnInit(): void {
    this.productEntityService.getAll().subscribe(entidades => this.entidades = entidades);
    console.log(this.entidades);
    
    this.titleService.setTitle('Entidades de Producto');
  }
  deleteEntidad(id: any) {
    this.productEntityService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  }

  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }
  
}

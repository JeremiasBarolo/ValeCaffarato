import { Component } from '@angular/core';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-product-entity',
  templateUrl: './product-entity.component.html',
  styleUrls: ['./product-entity.component.css']
})
export class ProductEntityComponent {
  entidades: any[] = []
  cardData: any = {
    name: '',
  }
  constructor(private titleService: TitleService, private maestroArticulosService: MaestroArticulosService) {
    
  }

  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(entidades => 
      this.entidades.forEach(producto => {
        if(producto.tipoArticulo === 'PRODUCTO'){
          this.entidades.push(producto);
        }
      })
      );
    console.log(this.entidades);
    
    this.titleService.setTitle('Entidades de Producto');
  }
  deleteEntidad(id: any) {
    this.maestroArticulosService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  }

  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }
  
}

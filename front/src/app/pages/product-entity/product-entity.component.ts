import { Component } from '@angular/core';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';


@Component({
  selector: 'app-product-entity',
  templateUrl: './product-entity.component.html',
  styleUrls: ['./product-entity.component.css']
})
export class ProductEntityComponent {
  breadcrumbItems: string = 'Entidades de Producto'
  entidades: any[] = []
  cardData: any = {
    name: '',
  }
  constructor(private maestroArticulosService: MaestroArticulosService) {
    
  }

  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(entidades => 
      entidades.forEach(producto => {
        if(producto.tipoArticulo === 'PRODUCTO'){
          this.entidades.push(producto);
        }
      })
      );
    console.log(this.entidades);
    
    
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

import { Component } from '@angular/core';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';


@Component({
  selector: 'app-product-entity',
  templateUrl: './product-entity.component.html',
  styleUrls: ['./product-entity.component.css']
})
export class ProductEntityComponent {
  breadcrumbItems: string = 'Entidades de Producto'
  entidades_disp: any[] = []
  filteredInsumo: any[] = []
  cardData: any = {
    name: '',
  }
  constructor(private maestroArticulosService: MaestroArticulosService) {
    
  }

  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(entidades => 
      entidades.forEach(producto => {
        if(producto.tipoArticulo === 'PRODUCTO'){
          this.entidades_disp.push(producto);
          this.filteredInsumo = this.entidades_disp;
        }
      })
      );
    
    
    
  }
  deleteEntidad(id: any) {
    this.maestroArticulosService.delete(id).subscribe(() => {
      this.entidades_disp = this.entidades_disp.filter(e => e.id !== id);
    });
  }

  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredInsumo = this.entidades_disp.filter(insumo => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }
  
}

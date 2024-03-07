import { Component } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';


@Component({
  selector: 'app-insumos-entity',
  templateUrl: './insumos-entity.component.html',
  styleUrls: ['./insumos-entity.component.css']
})
export class InsumosEntityComponent {
  entidades: any[] = []
  breadcrumbItems: string = 'Entidades de Insumos'
  cardData: any = {
    name: '',
    description: '',
    price: 0,
    unidad_medida: '',
  }
  constructor(private maestroArticulosService: MaestroArticulosService) {
    
  }
  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(insumos => 
      insumos.forEach(insumo => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.entidades.push(insumo);
        }
      })
    )
    
    
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

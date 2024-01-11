import { Component } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-insumos-entity',
  templateUrl: './insumos-entity.component.html',
  styleUrls: ['./insumos-entity.component.css']
})
export class InsumosEntityComponent {
  entidades: any[] = []
  cardData: any = {
    name: '',
    description: '',
    price: 0,
    unidad_medida: '',
  }
  constructor(private titleService: TitleService, private maestroArticulosService: MaestroArticulosService) {
    
  }
  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(insumos => 
      insumos.forEach(insumo => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.entidades.push(insumo);
        }
      })
    )
    
    this.titleService.setTitle('Entidades de Insumos');
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

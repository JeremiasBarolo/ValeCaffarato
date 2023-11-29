import { Component } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { InsumoEntity } from 'src/app/models/insumo-entity';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-insumos-entity',
  templateUrl: './insumos-entity.component.html',
  styleUrls: ['./insumos-entity.component.css']
})
export class InsumosEntityComponent {
  entidades: InsumoEntity[] = []
  cardData: InsumoEntity = {
    name: '',
    description: '',
    price: 0,
    unidad_medida: '',
  }
  constructor(private titleService: TitleService, private insumoEntityService: InsumoEntityService) {
    
  }
  
  ngOnInit(): void {
    this.insumoEntityService.getAll().subscribe(insumos => this.entidades = insumos);
    
    
    this.titleService.setTitle('Entidades de Insumos');
    console.log(this.entidades);
  }
  deleteEntidad(id: any) {
    this.insumoEntityService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  }
  showCardDetails(card: InsumoEntity) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

}

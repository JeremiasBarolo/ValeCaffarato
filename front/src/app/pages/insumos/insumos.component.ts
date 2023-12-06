import { Component } from '@angular/core';
import { Insumo } from 'src/app/models/insumo';
import { InsumoService } from 'src/app/services/insumo.service';
import { TitleService } from 'src/app/services/title.service';


@Component({
	
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']

})
export class InsumosComponent {
	entidades: Insumo[] = []
  cardData: Insumo = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    unidad_medida: '',
    profit: 0,
    costo_unit: 0
  }
  constructor(
    private titleService: TitleService, 
    private insumoService: InsumoService,
    ) {
    
  }
  
  ngOnInit(): void {
    this.insumoService.getAll().subscribe(insumos => this.entidades = insumos);
    this.titleService.setTitle('Insumos');
  }
  deleteEntidad(id: any) {
    this.insumoService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: Insumo) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

	
}
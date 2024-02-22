import { Component } from '@angular/core';
import { MonedasService } from 'src/app/services/monedas.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent {
  entidades: any[] = []
  cardData: any = {
    name: '',
    deposito: '',
    description: '',
    quantity: 0,
    price: 0,
    unidad_medida: '',
    profit: 0,
    costo_unit: 0
  }
  constructor(
    private titleService: TitleService, 
    private monedasService: MonedasService,
    ) {
    
  }
  
  ngOnInit(): void {
    this.monedasService.getAll().subscribe(insumos => 
      {
        this.entidades = insumos
      })
      
    this.titleService.setTitle('Insumos');
  }
  deleteEntidad(id: any) {
    this.monedasService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

}

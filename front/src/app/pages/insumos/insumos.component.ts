import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { TitleService } from 'src/app/services/title.service';




@Component({
	
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']

})
export class InsumosComponent implements OnInit, AfterViewInit {
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
    private productosEnStockService: ProductosEnStockService,
    ) {
    
  }
  
  
  ngOnInit(): void {
    this.productosEnStockService.getAll().subscribe(insumos => 
      insumos.forEach(element=>{
        if(element.type === "INSUMO"){
          this.entidades.push(element)
        }
  }))
      
    
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle('Insumos');
     
  }



  deleteEntidad(id: any) {
    this.productosEnStockService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

	
}
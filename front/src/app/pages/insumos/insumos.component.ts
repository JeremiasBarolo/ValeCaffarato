import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';





@Component({
	
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']

})
export class InsumosComponent implements OnInit {
  breadcrumbItems: string = 'Insumos'
	insumos: any[] = []
  filteredInsumo: any[] = []
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

    private productosEnStockService: ProductosEnStockService,
    private toastService: ToastrService
    ) {
    
  }
  
  
  ngOnInit(): void {
    this.productosEnStockService.getAll().subscribe(insumos => 
      insumos.forEach(element=>{
        if(element.type === "INSUMO"){
          this.insumos.push(element)
          this.filteredInsumo = this.insumos;
        }
  }))
      
    
  }




  deleteEntidad(id: any) {
    this.productosEnStockService.delete(id).subscribe(() => {
      this.filteredInsumo = this.insumos.filter(e => e.id !== id);
      this.toastService.success('Insumo eliminado correctamente');

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredInsumo = this.insumos.filter(insumo => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }

	
}
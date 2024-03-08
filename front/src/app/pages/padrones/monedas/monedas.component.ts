import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MonedasService } from 'src/app/services/monedas.service';


@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent {
  breadcrumbItems: string = 'Monedas'
  monedas: any[] = []
  filteredMonedas: any[] = []
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

    private monedasService: MonedasService,
    private toastr: ToastrService,
    ) {
    
  }
  
  ngOnInit(): void {
    this.monedasService.getAll().subscribe(insumos => {
        this.monedas = insumos
        this.filteredMonedas = insumos;
      })
      

  }
  deleteEntidad(id: any) {
    this.monedasService.delete(id).subscribe(() => {
      this.filteredMonedas = this.monedas.filter(e => e.id !== id);
      this.toastr.success('Moneda Eliminada', 'Exito');

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredMonedas = this.monedas.filter(deposito => {
      return deposito.description.toLowerCase().includes(value.toLowerCase());
    });
  }


  
}

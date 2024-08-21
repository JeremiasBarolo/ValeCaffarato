import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
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
  cardData: any = {}
  private destroy$ = new Subject<void>();

  constructor(

    private monedasService: MonedasService,
    private toastr: ToastrService,
    ) {
    
  }
  
  ngOnInit(): void {
    this.monedasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(insumos => {
        this.monedas = insumos
        this.filteredMonedas = insumos;
      })
      

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  deleteEntidad(id: any) {
    this.monedasService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredMonedas = this.monedas.filter(e => e.id !== id);
      this.toastr.success('Moneda Eliminada', 'Exito');

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredMonedas = this.monedas.filter(deposito => {
      return deposito.description.toLowerCase().includes(value.toLowerCase());
    });
  }


  
}

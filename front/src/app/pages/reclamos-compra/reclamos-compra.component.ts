import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { ReclamosService } from 'src/app/services/reclamos.service';

@Component({
  selector: 'app-reclamos-compra',
  templateUrl: './reclamos-compra.component.html',
  styleUrl: './reclamos-compra.component.css'
})
export class ReclamosCompraComponent {
  breadcrumbItems: string = 'Reclamos de Compra'
	insumos_disp: any[] = []
  filteredReclamos: any[] = []
  reclamos: any[] = []
  cardData: any = {}
  private destroy$ = new Subject<void>();

  constructor(

    private reclamosService: ReclamosService,
    private toastService: ToastrService
    ) {
    
  }
  
  
  ngOnInit(): void {
    this.reclamosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(reclamos =>
      reclamos.forEach(element=>{
        
        
        if(element.TipoReclamo === 'Compra'){
          this.reclamos.push(element)
        }

        this.filteredReclamos = [...this.reclamos]
      })) 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }




  deleteEntidad(id: any) {
    this.reclamosService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredReclamos = this.filteredReclamos.filter(e => e.id !== id);
      this.toastService.success('Insumo eliminado correctamente');

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredReclamos = this.reclamos.filter(insumo => {
      return insumo.detalles_reclamos.toLowerCase().includes(value.toLowerCase());
    });
  }
}
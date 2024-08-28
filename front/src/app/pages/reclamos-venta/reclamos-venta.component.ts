import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ReclamosService } from 'src/app/services/reclamos.service';

@Component({
  selector: 'app-reclamos-venta',
  templateUrl: './reclamos-venta.component.html',
  styleUrl: './reclamos-venta.component.css'
})
export class ReclamosVentaComponent {
  breadcrumbItems: string = 'Reclamos de Venta'
	insumos_disp: any[] = []
  filteredReclamos: any[] = []
  cardData: any = {}
  private destroy$ = new Subject<void>();
  reclamos: any[] = []

  constructor(

    private reclamosService: ReclamosService,
    private toastService: ToastrService
    ) {
    
  }
  
  
  ngOnInit(): void {
    this.reclamosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(reclamos =>
      reclamos.forEach(element=>{
        if(element.TipoReclamo === 'Venta'){
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
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CondIvaService } from 'src/app/services/cond-iva.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class CondicionIvaComponent {
  breadcrumbItems: string = 'Condicion de Iva'
  cond_iva: any[] = []
  filteredCond_iva: any[] = []

  cardData: any = {}
  tipo: any;
  DataArticulos: any={
    editar:false
  }

  private destroy$ = new Subject<void>();

  constructor(
    private condIvaService: CondIvaService,

    private toastr: ToastrService,
    ) {
  }
  
  ngOnInit(): void {
    this.condIvaService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tipo_personas => {
        this.cond_iva = tipo_personas
        this.filteredCond_iva = [...tipo_personas];
      })
      
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }







  deleteEntidad(id: any) {
    this.condIvaService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredCond_iva = this.cond_iva.filter(e => e.id !== id);
      this.toastr.success('Condicion Iva Eliminado', 'Exito');
    });
  } 

  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }
  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredCond_iva = this.cond_iva.filter(deposito => {
      return deposito.description.toLowerCase().includes(value.toLowerCase());
    });
  }


}

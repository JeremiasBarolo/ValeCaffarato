import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { BancosService } from 'src/app/services/bancos.service';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  breadcrumbItems: string = 'Bancos'
  entidades: any[] = []
  filteredBancos: any[] = [];
  listLocalidades: any[] = []
  cardData: any = {}
  DataArticulos: any={
    editar:false
  }
  @ViewChild('dt') 
  table!: Table;
  
  private destroy$ = new Subject<void>();

  constructor(
    private bancosService: BancosService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    ) {
      
        
      
  }

  
  
  ngOnInit(): void {
    this.bancosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tipo_personas => {
        this.entidades = tipo_personas
        this.filteredBancos = [...tipo_personas]; 
    })

    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 
  deleteEntidad(id: any) {
    this.bancosService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
      this.toastr.success('Banco Eliminado', 'Exito');
      this.filteredBancos = this.filteredBancos.filter(e => e.id !== id);
      this.table.reset();

    });
  } 

  showCardDetails(card: any) {
    this.cardData = card;
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredBancos = this.entidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

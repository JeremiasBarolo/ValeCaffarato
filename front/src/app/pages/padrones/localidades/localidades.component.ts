import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent {
  breadcrumbItems: string = 'Localidades'
  localidades: any[] = []
  filteredLocalidades: any[] = []
  listProvincias: any[] = []
  cardData: any = {}


  private destroy$ = new Subject<void>();

  constructor(

    private lolacidadesService: LocalidadesService,
    private provinciasService: ProvinciasService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
     
  }
  
  ngOnInit(): void {
    this.lolacidadesService.getAll().pipe(takeUntil(this.destroy$)).subscribe(localidad => {
        this.localidades = localidad
        this.filteredLocalidades = [...localidad];
      })

    this.provinciasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(provincia =>{
      this.listProvincias = provincia
    })
      

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteEntidad(id: any) {
    this.lolacidadesService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredLocalidades = this.localidades.filter(e => e.id !== id);
      this.toastr.success('Localidad Eliminada', 'Exito');
    });
  }
  


  showCardDetails(card: any) {
    this.cardData = card; 
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredLocalidades = this.localidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

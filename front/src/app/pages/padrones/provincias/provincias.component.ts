import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent {
  breadcrumbItems: string = 'Provincias'
  provincias: any[] = []
  filteredProvincias: any[] = []
  form: FormGroup;
  cardData: any = {}
  

  private destroy$ = new Subject<void>();
  constructor(
    private provinciasService: ProvinciasService,
    private paisService: PaisesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        name: ['',Validators.required],
        pais: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.provinciasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tipo_personas => {
        this.provincias = tipo_personas
        this.filteredProvincias = [...tipo_personas];
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 





  deleteEntidad(id: any) {
    this.provinciasService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredProvincias = this.provincias.filter(e => e.id !== id);
      this.toastr.success('Provincia Eliminada', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }
  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProvincias = this.provincias.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

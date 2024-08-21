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
  listPaises: any[] = []
  cardData: any = {}
  tipo: any;
  DataArticulos: any={
    editar:false
  }

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

    this.paisService.getAll().pipe(takeUntil(this.destroy$)).subscribe(paises =>{
      this.listPaises = paises
    })
      

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      name: this.DataArticulos.name,
      pais: this.DataArticulos.paisId,
    });
}



guardarNuevoTipo(){
  this.tipo = {
    name: this.form.value.name,
    paisId: this.form.value.pais
  }

 if(this.DataArticulos.editar === true){
  this.provinciasService.update(this.DataArticulos.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
  });
 } else{
  try {
    this.provinciasService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Tipo de Articulo Creado', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  }
  
  }
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

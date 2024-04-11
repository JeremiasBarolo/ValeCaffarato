import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaisesService } from 'src/app/services/paises.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrl: './unidades-medida.component.css'
})
export class UnidadesMedidaComponent {
  breadcrumbItems: string = 'Unidades de Medida'
  paises: any[] = []
  filteredUnidades: any[] = []
  form: FormGroup;
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
  unidad: any;
  DataArticulos: any={
    editar:false
  }
  constructor(
    private unidadesService: UnidadMedidaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        descripcion: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.unidadesService.getAll().subscribe(unidades => {
        this.paises = unidades
        this.filteredUnidades = [...unidades];
      })
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      descripcion: this.DataArticulos.descripcion
    });
}



guardarNuevoTipo(){
  this.unidad = {
    descripcion: this.form.value.descripcion
  }

 if(this.DataArticulos.editar === true){
  this.unidadesService.update(this.DataArticulos.id, this.unidad).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Pais Actualizado', 'Exito');
  });
 } else{
  try {
    this.unidadesService.create(this.unidad).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Pais Creado', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  }
  
  }
}

  deleteEntidad(id: any) {
    this.unidadesService.delete(id).subscribe(() => {
      this.paises = this.paises.filter(e => e.id !== id);
      this.toastr.success('Unidad Eliminada', 'Exito');
      this.filteredUnidades = this.paises.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredUnidades = this.paises.filter(deposito => {
      return deposito.descripcion.toLowerCase().includes(value.toLowerCase());
    });
  }
}

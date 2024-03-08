import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent {
  breadcrumbItems: string = 'Paises'
  paises: any[] = []
  filteredPaises: any[] = []
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
  tipo: any;
  DataArticulos: any={
    editar:false
  }
  constructor(
    private paisesService: PaisesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        name: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.paisesService.getAll().subscribe(tipo_personas => {
        this.paises = tipo_personas
        this.filteredPaises = [...tipo_personas];
      })
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      name: this.DataArticulos.name
    });
}



guardarNuevoTipo(){
  this.tipo = {
    name: this.form.value.name
  }

 if(this.DataArticulos.editar === true){
  this.paisesService.update(this.DataArticulos.id, this.tipo).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Pais Actualizado', 'Exito');
  });
 } else{
  try {
    this.paisesService.create(this.tipo).subscribe(() => {
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
    this.paisesService.delete(id).subscribe(() => {
      this.paises = this.paises.filter(e => e.id !== id);
      this.toastr.success('Pais Eliminado', 'Exito');
      this.filteredPaises = this.paises.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredPaises = this.paises.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }
}

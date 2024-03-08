import { Component } from '@angular/core';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.css']
})
export class TipoPersonaComponent {
  breadcrumbItems: string = 'Tipo Persona'
  tipoPersona: any[] = []
  filteredTipoPersona: any[] = []
  form!: FormGroup;
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

    private tipoPersonasService: TipoPersonaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        description: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.tipoPersonasService.getAll().subscribe(tipo_personas => {
        this.tipoPersona = tipo_personas
        this.filteredTipoPersona = [...tipo_personas];
      })
      
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      description: this.DataArticulos.description
    });
}



guardarNuevoTipo(){
  this.tipo = {
    description: this.form.value.description
  }

 if(this.DataArticulos.editar === true){
  this.tipoPersonasService.update(this.DataArticulos.id, this.tipo).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Tipo de Persona Actualizado', 'Exito');
  });
 } else{
  try {
    this.tipoPersonasService.create(this.tipo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Tipo de Persona Creado', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  }
  
  }
}

  deleteEntidad(id: any) {
    this.tipoPersonasService.delete(id).subscribe(() => {
      this.filteredTipoPersona = this.tipoPersona.filter(e => e.id !== id);
      this.toastr.success('Tipo de Persona Eliminado', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredTipoPersona = this.tipoPersona.filter(deposito => {
      return deposito.description.toLowerCase().includes(value.toLowerCase());
    });
  }
}

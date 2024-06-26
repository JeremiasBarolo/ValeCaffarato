import { Component } from '@angular/core';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CondIvaService } from 'src/app/services/cond-iva.service';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrls: ['./unidades-medida.component.css']
})
export class CondicionIvaComponent {
  breadcrumbItems: string = 'Condicion de Iva'
  cond_iva: any[] = []
  filteredCond_iva: any[] = []
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
    private condIvaService: CondIvaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        description: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.condIvaService.getAll().subscribe(tipo_personas => {
        this.cond_iva = tipo_personas
        this.filteredCond_iva = [...tipo_personas];
      })
      
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      description: this.DataArticulos.description
    });
}



guardarNuevoTipo(){
  this.tipo = {
    description: this.form.value.description
  }

 if(this.DataArticulos.editar === true){
  this.condIvaService.update(this.DataArticulos.id, this.tipo).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Concicion Actualizada', 'Exito');
  });
 } else{
  try {
    this.condIvaService.create(this.tipo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Concicion Creada', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  }
  
  }
}

  deleteEntidad(id: any) {
    this.condIvaService.delete(id).subscribe(() => {
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

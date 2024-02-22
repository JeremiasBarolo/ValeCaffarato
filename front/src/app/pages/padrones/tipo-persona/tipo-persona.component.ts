import { Component } from '@angular/core';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { TitleService } from 'src/app/services/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.css']
})
export class TipoPersonaComponent {
  entidades: any[] = []
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
    private titleService: TitleService, 
    private tipoPersonasService: TipoPersonaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        description: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.tipoPersonasService.getAll().subscribe(tipo_personas => 
      {
        this.entidades = tipo_personas
      })
      
    this.titleService.setTitle('Tipo Personas');
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
    this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
  });
 } else{
  try {
    this.tipoPersonasService.create(this.tipo).subscribe(() => {
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
    this.tipoPersonasService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }
}

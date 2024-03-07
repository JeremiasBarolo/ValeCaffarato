import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent {
  breadcrumbItems: string = 'Localidades'
  entidades: any[] = []
  form: FormGroup;
  listProvincias: any[] = []
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

    private lolacidadesService: LocalidadesService,
    private provinciasService: ProvinciasService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        name: ['',Validators.required],
        provincia: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.lolacidadesService.getAll().subscribe(tipo_personas => 
      {
        this.entidades = tipo_personas
      })

    this.provinciasService.getAll().subscribe(provincia =>{
      this.listProvincias = provincia
    })
      

  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      name: this.DataArticulos.name,
      provincia: this.DataArticulos.provinciaId,
    });
}



guardarNuevoTipo(){
  this.tipo = {
    name: this.form.value.name,
    provinciaId: this.form.value.provincia
  }

 if(this.DataArticulos.editar === true){
  this.lolacidadesService.update(this.DataArticulos.id, this.tipo).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
  });
 } else{
  try {
    this.lolacidadesService.create(this.tipo).subscribe(() => {
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
    this.lolacidadesService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
      this.toastr.success('Tipo de Articulo Eliminado', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

}

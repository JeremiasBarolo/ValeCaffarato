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
  localidades: any[] = []
  filteredLocalidades: any[] = []
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
        codigo_postal: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.lolacidadesService.getAll().subscribe(localidad => {
        this.localidades = localidad
        this.filteredLocalidades = [...localidad];
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
      codigo_postal: this.DataArticulos.codigo_postal,
    });
}



guardarNuevoTipo(){
  this.tipo = {
    name: this.form.value.name,
    provinciaId: this.form.value.provincia,
    codigo_postal: this.form.value.codigo_postal
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
      this.filteredLocalidades = this.localidades.filter(e => e.id !== id);
      this.toastr.success('Localidad Eliminada', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredLocalidades = this.localidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

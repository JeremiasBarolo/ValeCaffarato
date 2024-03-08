import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { BancosService } from 'src/app/services/bancos.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  breadcrumbItems: string = 'Bancos'
  entidades: any[] = []
  filteredBancos: any[] = [];
  form: FormGroup;
  listLocalidades: any[] = []
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
  @ViewChild('dt')
  table!: Table; 
  constructor(
    private bancosService: BancosService,
    private lolacidadesService: LocalidadesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    ) {
      this.form = this.fb.group({
        name: ['',Validators.required],
        localidad: ['',Validators.required],
        
      });
  }

  
  
  ngOnInit(): void {
    this.bancosService.getAll().subscribe(tipo_personas => {
        this.entidades = tipo_personas
        this.filteredBancos = [...tipo_personas]; 
  })

    this.lolacidadesService.getAll().subscribe(provincia =>{
      this.listLocalidades = provincia
    })
      
    
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      name: this.DataArticulos.name,
      localidad: this.DataArticulos.localidadId,
    });
}



guardarNuevoTipo(){
  this.tipo = {
    name: this.form.value.name,
    localidadId: this.form.value.localidad
  }

 if(this.DataArticulos.editar === true){
  this.bancosService.update(this.DataArticulos.id, this.tipo).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Banco Actualizado', 'Exito');
  });
 } else{
  try {
    this.bancosService.create(this.tipo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Banco Creado', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  }
  
  }
}

  deleteEntidad(id: any) {
    this.bancosService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
      this.toastr.success('Banco Eliminado', 'Exito');
      this.filteredBancos = this.filteredBancos.filter(e => e.id !== id);
      this.table.reset();

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredBancos = this.entidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }
}

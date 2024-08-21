import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { BancosService } from 'src/app/services/bancos.service';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
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
  cardData: any = {}
  tipo: any;
  DataArticulos: any={
    editar:false
  }
  @ViewChild('dt') 
  table!: Table;
  
  private destroy$ = new Subject<void>();

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
        edit_localidad: [''],
        edit_name: [''],
      });
        
      
  }

  
  
  ngOnInit(): void {
    this.bancosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tipo_personas => {
        this.entidades = tipo_personas
        this.filteredBancos = [...tipo_personas]; 
    })

    this.lolacidadesService.getAll().pipe(takeUntil(this.destroy$)).subscribe(provincia =>{
      this.listLocalidades = provincia
    })

   
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      edit_name: this.DataArticulos.name,
      edit_localidad: this.DataArticulos.localidadId,
    });
}



guardarNuevoTipo(){
 

 if(this.DataArticulos.editar === true){
  try {
    this.tipo = {
      name: this.form.value.edit_name,
      localidadId: this.form.value.edit_localidad
    }
    this.bancosService.update(this.DataArticulos.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)
      this.toastr.success('Banco Actualizado', 'Exito');
    });
  } catch (error) {
    console.log(error);
  }
  
 } else{
  try {
    this.tipo = {
      name: this.form.value.name,
      localidadId: this.form.value.localidad
    }

    this.bancosService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
    this.bancosService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
      this.toastr.success('Banco Eliminado', 'Exito');
      this.filteredBancos = this.filteredBancos.filter(e => e.id !== id);
      this.table.reset();

    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredBancos = this.entidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  QuitarId(){
    this.DataArticulos = {
      editar:false
    }
  }
}

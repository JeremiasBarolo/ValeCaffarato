import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { TipoReclamosService } from 'src/app/services/tipo-reclamos.service';

@Component({
  selector: 'app-tipo-reclamos',
  templateUrl: './tipo-reclamos.component.html',
  styleUrl: './tipo-reclamos.component.css'
})
export class TipoReclamosComponent {
  breadcrumbItems: string = 'Tipo de Reclamo'
  tipoReclamos: any[] = []
  filteredTipoReclamos: any[] = []
  form!: FormGroup;
  cardData: any = {}
  tipo: any;
  DataArticulos: any={
    editar:false
  }
  private destroy$ = new Subject<void>();


  constructor(

    private tipoReclamoService: TipoReclamosService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        des_reclamo: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.tipoReclamoService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tipo_reclamos => {
        this.tipoReclamos = tipo_reclamos
        this.filteredTipoReclamos = [...tipo_reclamos];
      })
      
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      des_reclamo: this.DataArticulos.des_reclamo
    });
}



guardarNuevoTipo(){
  this.tipo = {
    des_reclamo: this.form.value.des_reclamo
  }

 if(this.DataArticulos.editar === true){
  this.tipoReclamoService.update(this.DataArticulos.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Tipo de Persona Actualizado', 'Exito');
  });
 } else{
  try {
    this.tipoReclamoService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
    this.tipoReclamoService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredTipoReclamos = this.tipoReclamos.filter(e => e.id !== id);
      this.toastr.success('Tipo de Persona Eliminado', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredTipoReclamos = this.tipoReclamos.filter(deposito => {
      return deposito.des_reclamo.toLowerCase().includes(value.toLowerCase());
    });
  }
}
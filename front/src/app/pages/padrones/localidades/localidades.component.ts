import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Subject, takeUntil } from 'rxjs';

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
  cardData: any = {}
  tipo: any;
  DataArticulos: any={
    editar:false
  }

  private destroy$ = new Subject<void>();

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
    this.lolacidadesService.getAll().pipe(takeUntil(this.destroy$)).subscribe(localidad => {
        this.localidades = localidad
        this.filteredLocalidades = [...localidad];
      })

    this.provinciasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(provincia =>{
      this.listProvincias = provincia
    })
      

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarTipo(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
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
  this.lolacidadesService.update(this.DataArticulos.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
  });
 } else{
  try {
    this.lolacidadesService.create(this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
    this.lolacidadesService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredLocalidades = this.localidades.filter(e => e.id !== id);
      this.toastr.success('Localidad Eliminada', 'Exito');
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredLocalidades = this.localidades.filter(deposito => {
      return deposito.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

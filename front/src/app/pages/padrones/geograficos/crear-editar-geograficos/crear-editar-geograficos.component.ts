import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PaisesService } from 'src/app/services/paises.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { BancosService } from 'src/app/services/bancos.service';

@Component({
  selector: 'app-crear-editar-geograficos',
  templateUrl: './crear-editar-geograficos.component.html',
  styleUrls: ['./crear-editar-geograficos.component.css']
})
export class CrearEditarGeograficosComponent {
  any: any | any;
  listPadrones: any[] = []
  form: FormGroup;
  id: string;
  id_update: number 
  accion:string;
  operacion: string = 'Agregar ';
  anyData: any | any;
  selectedId: number | undefined
 
 
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private paisesService: PaisesService,
    private provinciasService: ProvinciasService,
    private localidadesService: LocalidadesService,
    private bancosService: BancosService,

  ) {
    this.id = aRoute.snapshot.paramMap.get('id') ?? '';
    const idUpdateParam = aRoute.snapshot.paramMap.get('id_update');
    this.accion = aRoute.snapshot.paramMap.get('accion') ?? '';

    this.id_update = idUpdateParam !== null ? +idUpdateParam : 0;


    if ((this.id === 'PAIS' || (this.id_update && this.accion === 'PAIS'))) {
      this.form = this.fb.group({
        pais_name: ['', Validators.required],
      });
    } else if ((this.id === 'PROVINCIA' || (this.id_update && this.accion === 'PROVINCIA'))) {
      this.form = this.fb.group({
        provincia_name: ['', Validators.required],
        paisId: ['', Validators.required],
      });
    } else if ((this.id === 'LOCALIDAD' || (this.id_update && this.accion === 'LOCALIDAD'))) {
      this.form = this.fb.group({
        localidad_name: ['', Validators.required],
        codigo_postal: ['', Validators.required],
        provinciaId: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        banco_name: ['', Validators.required],
        localidadId: ['', Validators.required],
      });
    }
    
    
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.loadAllEntities();
      if (this.accion != null) {
        this.getPadron(this.id_update, this.accion);
      }
    } else {
      this.loadAllEntities();
    }
  }

  ngAfterViewInit(): void {
    if (this.id) {

    
    }else if(this.accion){

      
    }else{

    }
  }

  addInsumo() {
    if(this.id === 'PAIS' || this.accion === 'PAIS'){

      let pais = {name: this.form.value.pais_name}

      this.paisesService.create(pais).subscribe((data) => {

        this.router.navigate(['dashboard/geograficos']);
        
      })
    }else if(this.id === "PROVINCIA" || this.accion === 'PROVINCIA'){

      let provincia = {name: this.form.value.provincia_name, paisId:this.form.value.paisId }

      this.provinciasService.create(provincia).subscribe((data) => {

        this.router.navigate(['dashboard/geograficos']);
        
      })
    }else if(this.id === "LOCALIDAD" || this.accion === 'LOCALIDAD'){

      let localidad = {name: this.form.value.localidad_name, codigo_postal: this.form.value.codigo_postal, provinciaId:this.form.value.provinciaId }

      this.localidadesService.create(localidad).subscribe((data) => {
        
        this.router.navigate(['dashboard/geograficos']);
        
      })
    }else{

      let banco = {name: this.form.value.banco_name, localidadId:this.form.value.localidadId }
      this.bancosService.create(banco).subscribe((data) => {
        this.router.navigate(['dashboard/geograficos']);
        
      })
    }
  }
  

  getPadron(id: number, accion:string) {
    
    
    

    if(accion=== 'PAIS'){

      this.paisesService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          pais_name: data.name
        });
      })

    }else if(accion === "PROVINCIA"){

      this.provinciasService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          provincia_name: data.name,
          paisId: data.paisId
        });
    });

    }else if(accion === "LOCALIDAD"){
      
      
       this.localidadesService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          localidad_name: data.name,
          codigo_postal: data.codigo_postal,
          provinciaId: data.provinciaId
        });
        
      });
    }else if(accion === "BANCO"){
      this.bancosService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          banco_name: data.name,
          localidadId: data.localidadId
        });
        
      });
    }

    
  }

  loadAllEntities() {
    if(this.id === "PROVINCIA"){
      this.paisesService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else if(this.id === "LOCALIDAD"){
      this.provinciasService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else{
      this.localidadesService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }
    
  }
}


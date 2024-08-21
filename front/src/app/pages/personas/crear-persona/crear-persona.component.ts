import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { CondIvaService } from 'src/app/services/cond-iva.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { PaisesService } from 'src/app/services/paises.service';

import { PersonasService } from 'src/app/services/personas.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent {
  breadcrumbItems: string = 'Crear/Editar Personas'
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  tipo: any[] = [];
  cond: any[] = [];
  subtotal: number[] = [];
  Persona: any
  selectedOption: string = ''
  operacion: string = ''
  personData: any | any;
  countries:any[]= []
  provinces:any[]= []
  localities:any[]= []
  localidades: any[] = [];
  tipoArticulo: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private personasService: PersonasService,
    private route: ActivatedRoute,
    private tipoPersonasService: TipoPersonaService,
    private paisesService: PaisesService,
    private provinciasService: ProvinciasService,
    private localidadesService: LocalidadesService,
    private condIvaService: CondIvaService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
      address: ['', Validators.required],
      adress_number: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      tipo_persona: ['', Validators.required],
      cond_iva: ['', Validators.required],
      locality: ['', Validators.required],
     
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    
  }
  

  ngAfterViewInit(): void {
    if(this.id !== 0){
      this.getPersona(this.id);
    }
    
    this.aRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.tipoArticulo = params['tipoArticulo'];
      console.log('Tipo de Artículo:', this.tipoArticulo);
      
    });
  
    this.tipoPersonasService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.tipo = data;
      console.log('Tipos de Persona:', this.tipo);
    });

    this.loadTipoPersona(this.tipoArticulo);

    this.condIvaService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.cond = data;
    });
  
    this.loadLocalities();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  addPersona() {
    this.Persona = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      dni: this.form.value.dni,
      cuil: this.form.value.cuil,
      address: this.form.value.address,
      adress_number: this.form.value.adress_number,
      phone: this.form.value.phone,
      email: this.form.value.email,
      tipo_persona:this.form.value.tipo_persona,
      cond_iva:this.form.value.cond_iva,
      localidadId:this.form.value.locality
    };
     
     
    

    if (this.id !== 0) {
      // Es editar
      try {
        console.log(this.Persona);
        
          this.personasService.update(this.id,{
            ...this.Persona,
          }).pipe(takeUntil(this.destroy$)).subscribe(() => {
            
            this.router.navigate(['dashboard/inicio']);
          });
        
        
    
      } catch (error) {
        console.log(error);
      }

    } else {
      // Es agregar
      try {
          this.personasService.create({
            ...this.Persona
          }).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['dashboard/inicio']);
          }
          );
        
       
        
      } catch (error) {
        console.log(error);
      }
    }

  }

getPersona(id: number) {



    this.personasService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      
  
      let persona: any = {
        name: data.name,
        lastname: data.lastname,
        dni: data.dni,
        cuil: data.cuil,
        address: data.adress,
        adress_number: data.adress_number,
        phone: data.phone,
        email: data.email,
      };

      
      




      this.provinciasService.getById(data.Localidad.provinciaId).pipe(takeUntil(this.destroy$)).subscribe((provincia)=>{
        
          this.form.setValue({
            name: persona.name,
            lastname: persona.lastname,
            address: persona.address,
            adress_number: persona.adress_number,
            dni: persona.dni,
            cuil: persona.cuil,
            phone: persona.phone,
            email: persona.email,
            cond_iva:data.Condicion_Iva.id,
            tipo_persona:data.Tipo_Persona.id,
            locality:data.localidadId,
  
        });

      
      
      
  
        

      
    })
  }
  )}

  
  
  loadLocalities(provinceId?: number) {
    this.localidadesService.getAll().pipe(takeUntil(this.destroy$)).subscribe((localities) => {
      this.localidades = localities
      
      
    });
    
  }

  loadTipoPersona(tipoArticulo:string): void {
    if (tipoArticulo === 'empleado') {
      this.form.patchValue({
        tipo_persona: 1
      });
    } else if (tipoArticulo === 'cliente') {
      this.form.patchValue({
        tipo_persona: 3
      });
    } else if (tipoArticulo === 'proveedor') {
      this.form.patchValue({
        tipo_persona: 2
      });
    }
  }

  
  
  
  
  
  
  

}


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { CondIvaService } from 'src/app/services/cond-iva.service';

import { PersonasService } from 'src/app/services/personas.service';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent {
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private personasService: PersonasService,
    private titleService: TitleService,
    private tipoPersonasService: TipoPersonaService,
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
      
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }
  

  ngAfterViewInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Persona');
      console.log(this.id);
      this.getPersona(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Persona');
      this.tipoPersonasService.getAll().subscribe((data)=>{
        this.tipo = data
      })
      this.condIvaService.getAll().subscribe((data)=>{
        this.cond = data
      })
      
    }   
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
      cond_iva:this.form.value.cond_iva
      
    };
     
     
    

    if (this.id !== 0) {
      // Es editar
      try {
          this.personasService.update(this.id,{
            ...this.Persona,
          }).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
        
        
    
      } catch (error) {
        console.log(error);
      }





    } else {
      // Es agregar
      try {
          this.personasService.create({
            ...this.Persona,
            cargo: this.form.value.cargo,
          }).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
        
       
        
      } catch (error) {
        console.log(error);
      }
    }

  }

getPersona(id: number) {
    this.personasService.getById(id).subscribe((data: any) => {
      console.log(data);
  
      let persona: any = {
        name: data.name,
        lastname: data.lastname,
        dni: data.dni,
        cuil: data.cuil,
        address: data.adress,
        adress_number: data.adress_number,
        phone: data.phone,
        email: data.email,
        categoria: data.categoria, 
      };
      
      console.log('Persona:', persona);
  
        this.form.setValue({
          name: persona.name,
          lastname: persona.lastname,
          address: persona.address,
          adress_number: persona.adress_number,
          dni: persona.dni,
          cuil: persona.cuil,
          phone: persona.phone,
          email: persona.email,
          cond_iva:persona.cond_iva,
          tipo_persona:persona.tipo_persona
        });
      
    })
  }


}


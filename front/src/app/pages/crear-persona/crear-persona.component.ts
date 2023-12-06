import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';

import { PersonasService } from 'src/app/services/personas.service';
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
  selectedEntities: any[] = [];
  InsumosEntities: any[] = [];
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
      selectedOption: ['', Validators.required],
      industry: [''], 
      city: [''], 
      cargo: [''],
      providerCity: [''],
      clientCompany: [''],
      clientCity: [''],
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }
  

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Persona');
      console.log(this.id);
      this.getPersona(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Persona');
      
    }   
  }


  addPersona(selectedOption: string) {
    const formData = this.form.value; 
    
    this.Persona = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      dni: this.form.value.dni,
      cuil: this.form.value.cuil,
      address: this.form.value.address,
      adress_number: this.form.value.adress_number,
      phone: this.form.value.phone,
      email: this.form.value.email,
      categoria: this.form.value.selectedOption,
    };
     
     
    

    if (this.id !== 0) {
      // Es editar
      try {
        if (this.form.value.selectedOption === 'PROVEEDOR') {
          let city = this.form.value.providerCity
          
          
          this.personasService.update(this.id,{
            
            ...this.Persona,
            city: city,
            industry: this.form.value.industry
          }).subscribe(() => {
            this.router.navigate(['dashboard/proveedores']);
          });

        } else if (this.form.value.selectedOption === 'CLIENTE') {
            let city = this.form.value.clientCity
            
            
            this.personasService.update(this.id,{
              ...this.Persona,
              city: city,
              industry: this.form.value.clientCompany
            }).subscribe(() => {
              this.router.navigate(['dashboard/clientes']);
            });
        
          
        } else {

          this.personasService.update(this.id,{
            ...this.Persona,
            cargo: this.form.value.cargo,
          }).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
        }
        
    
      } catch (error) {
        console.log(error);
      }





    } else {
      // Es agregar
      try {
        
        if (this.form.value.selectedOption === 'PROVEEDOR') {
          let city = this.form.value.city
          
          
          this.personasService.create({
            ...this.Persona,
            city: city,
            industry: this.form.value.industry
          }).subscribe(() => {
            this.router.navigate(['dashboard/proveedores']);
          });

        } else if (this.form.value.selectedOption === 'CLIENTE') {
            let city = this.form.value.clientCity
            
            
            this.personasService.create({
              ...this.Persona,
              city: city,
              industry: this.form.value.clientCompany
            }).subscribe(() => {
              this.router.navigate(['dashboard/clientes']);
            });
        
          
        } else {

          this.personasService.create({
            ...this.Persona,
            cargo: this.form.value.cargo,
          }).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
        }
       
        
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
  
      if (persona.categoria === 'PROVEEDOR') {
        this.form.setValue({
            name: persona.name,
            lastname: persona.lastname,
            address: persona.address, 
            adress_number: persona.adress_number,
            dni: persona.dni,
            cuil: persona.cuil,
            phone: persona.phone,
            email: persona.email,
            selectedOption: persona.categoria,
            industry: data.proveedor ? data.proveedor[0].industry : null,
            providerCity: data.proveedor ? data.proveedor[0].city : null,
            clientCompany: '',
            clientCity: '',
            cargo: '',
            city: '',
        });
    } else if (persona.categoria === 'CLIENTE') {
        this.form.setValue({
            name: persona.name,
            lastname: persona.lastname,
            address: persona.address, 
            adress_number: persona.adress_number,
            dni: persona.dni,
            cuil: persona.cuil,
            phone: persona.phone,
            email: persona.email,
            selectedOption: persona.categoria,
            clientCompany: data.cliente && data.cliente.length > 0 ? data.cliente[0].industry : null,
            clientCity: data.cliente && data.cliente.length > 0 ? data.cliente[0].city : null,
            cargo: '',
            industry: '',
            city: '',
            providerCity: '',
        });
    }
     else {
        this.form.setValue({
          selectedOption: persona.categoria,
          name: persona.name,
          lastname: persona.lastname,
          address: persona.address,
          adress_number: persona.adress_number,
          dni: persona.dni,
          cuil: persona.cuil,
          phone: persona.phone,
          email: persona.email,
          cargo: data.empleado && data.empleado.length > 0 ? data.empleado[0].cargo : null,
          industry: '',
          city: '',
          providerCity: '',
          clientCompany: '',
          clientCity: '',
        });
      }
    })
  }


}


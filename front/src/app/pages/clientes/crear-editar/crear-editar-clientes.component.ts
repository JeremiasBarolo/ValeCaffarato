import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-clientes',
  templateUrl: './crear-editar-clientes.component.html',
  styleUrls: ['./crear-editar-clientes.component.css']
})
export class CrearEditarClientesComponent implements AfterViewInit {
  cliente: Cliente | any;
  listClientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  ClienteData: Cliente | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private clienteService: ClientesService,
    private titleService: TitleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      industry: ['', Validators.required],
      dni: ['', Validators.required],
      city: ['', Validators.required],
      cuit: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Cliente');
      console.log(this.id);
      this.getCliente(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Cliente');
      
    }   
  }

  addCliente() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('lastname', this.form.value.lastname);
      formData.append('industry', this.form.value.industry);
      formData.append('city', this.form.value.city);
      formData.append('dni', this.form.value.dni);
      formData.append('phone', this.form.value.phone);
      formData.append('cuit', this.form.value.cuit);
      formData.append('email', this.form.value.email);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.cliente = {
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        industry: this.form.value.industry,
        city: this.form.value.city,
        phone: this.form.value.phone,
        dni: this.form.value.dni,
        cuit: this.form.value.cuit,
        email: this.form.value.email,
      };
      if (this.id !== 0) {
        // Es editar
        try {
          this.clienteService.update(this.id, this.cliente).subscribe(() => {
            this.router.navigate(['dashboard/clientes']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.clienteService.create(this.cliente).subscribe(() => {
            this.router.navigate(['dashboard/clientes']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getCliente(id: number) {
    this.clienteService.getById(id).subscribe((data: Cliente)=> {
      let Cliente: Cliente = {

        name: data.name,
        lastname: data.lastname,
        industry: data.industry,
        city: data.city,
        phone: data.phone,
        dni: data.dni,
        cuit: data.cuit,
        email: data.email,
      
      };
  
      this.ClienteData = Cliente;

      this.form.setValue({
        name: data.name,
        lastname: data.lastname,
        industry: data.industry,
        city: data.city,
        phone: data.phone,
        dni: data.dni,
        cuit: data.cuit,
        email: data.email,
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'data.name',
        lastname: 'data.lastname',
        industry: 'NASHEEE',
        city: 'NASHEEE',
        phone: 1212,
        dni: 1212,
        cuit: 121,
        email: 'NASHEEE'
    });
  }
}

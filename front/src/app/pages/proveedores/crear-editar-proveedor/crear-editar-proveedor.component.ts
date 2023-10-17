import { Proveedor } from 'src/app/models/proveedor';
import { TitleService } from 'src/app/services/title.service';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../../../models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-crear-editar-proveedor',
  templateUrl: './crear-editar-proveedor.component.html',
  styleUrls: ['./crear-editar-proveedor.component.css']
})
export class CrearEditarProveedorComponent {
  proveedor: Proveedor | any;
  listproveedors: Observable<Proveedor[]> = new Observable<Proveedor[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  proveedorData: Proveedor | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private proveedorService: ProveedoresService,
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
      this.titleService.setTitle('Editar Proveedor');
      console.log(this.id);
      this.getProveedor(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Proveedor');
      
    }   
  }

  addProveedor() {
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
      
      this.proveedor = {
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
          this.proveedorService.update(this.id, this.proveedor).subscribe(() => {
            this.router.navigate(['dashboard/proveedores']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.proveedorService.create(this.proveedor).subscribe(() => {
            this.router.navigate(['dashboard/proveedores']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getProveedor(id: number) {
    this.proveedorService.getById(id).subscribe((data: Proveedor)=> {
      let proveedor: Proveedor = {

        name: data.name,
        lastname: data.lastname,
        industry: data.industry,
        city: data.city,
        phone: data.phone,
        dni: data.dni,
        cuit: data.cuit,
        email: data.email,
      
      };
  
      this.proveedorData = proveedor;

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

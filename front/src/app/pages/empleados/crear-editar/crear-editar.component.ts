import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadosServiceService } from 'src/app/services/empleados-service.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarEmpleadosComponent {
  empleado: Empleado | any;
  listEmpleados: Observable<Empleado[]> = new Observable<Empleado[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  EmpleadoData: Empleado | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private empleadosService: EmpleadosServiceService,
    private titleService: TitleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      adress: ['', Validators.required],
      adressNumber: ['', Validators.required],
      dni: ['', Validators.required],
      city: ['', Validators.required],
      cuit: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Insumos');
      console.log(this.id);
      
      this.getEmpleado(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Insumos');
      
    }   
  }

  addEmpleado() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('lastname', this.form.value.lastname);
      formData.append('adress', this.form.value.adress);
      formData.append('adressNumber', this.form.value.adressNumber);
      formData.append('city', this.form.value.city);
      formData.append('dni', this.form.value.dni);
      formData.append('phone', this.form.value.phone);
      formData.append('cuit', this.form.value.cuit);
      formData.append('email', this.form.value.email);
      formData.append('role', this.form.value.role);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.empleado = {
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        adress: this.form.value.adress,
        adressNumber: this.form.value.adressNumber,
        city: this.form.value.city,
        phone: this.form.value.phone,
        dni: this.form.value.dni,
        cuit: this.form.value.cuit,
        role: this.form.value.role,
        email: this.form.value.email,
      };
      if (this.id !== 0) {
        // Es editar
        try {
          this.empleadosService.update(this.id, this.empleado).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.empleadosService.create(this.empleado).subscribe(() => {
            this.router.navigate(['dashboard/empleados']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getEmpleado(id: number) {
    this.empleadosService.getById(id).subscribe((data: Empleado)=> {
      let Empleado: Empleado = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        adress: data.adress,
        adressNumber: data.adressNumber,
        city: data.city,
        phone: data.phone,
        dni: data.dni,
        cuit: data.cuit,
        role: data.role,
        email: data.email,
      
      };
  
      this.EmpleadoData = Empleado;

      this.form.setValue({
        name: data.name,
        lastname: data.lastname,
        adress: data.adress,
        adressNumber: data.adressNumber,
        city: data.city,
        phone: data.phone,
        dni: data.dni,
        cuit: data.cuit,
        role: data.role,
        email: data.email,
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
      name: 'data.name',
        lastname: 'data.lastname',
        adress: 'NASHEEE',
        adressNumber: 12112,
        city: 'NASHEEE',
        phone: 1212,
        dni: 1212,
        cuit: 121,
        role: 'NASHEEE',
        email: 'NASHEEE'
    });
  }

}

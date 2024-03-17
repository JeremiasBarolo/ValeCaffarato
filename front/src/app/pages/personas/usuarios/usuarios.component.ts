import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaisesService } from 'src/app/services/paises.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  breadcrumbItems: string = 'Usuarios'
  usuarios: any[] = []
  filteredUsuarios: any[] = []
  form: FormGroup;
  cardData: any = {
    name: '',
    deposito: '',
    description: '',
    quantity: 0,
    price: 0,
    unidad_medida: '',
    profit: 0,
    costo_unit: 0
  }
  tipo: any;
  DataArticulos: any={
    editar:false
  }


  constructor(
    private usuariosService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) {
      this.form = this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required],
        rol: ['',Validators.required],
        
      });
  }
  
  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(personas => {
        this.usuarios = personas
        this.filteredUsuarios = [...personas];
      })
  }

 



guardarNuevoTipo(){
  this.tipo = {
    username: this.form.value.username,
    password: this.form.value.password,
    rol: this.form.value.rol,
  }
  try {
    this.usuariosService.create(this.tipo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Usuario Creado', 'Exito');

    });
    
  } catch (error) {
    console.log(error);
  
  
  
  }
}

  deleteEntidad(id: any) {
    this.usuariosService.delete(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(e => e.id !== id);
      this.toastr.success('Usuario Eliminado', 'Exito');
      this.filteredUsuarios = this.usuarios.filter(e => e.id !== id);
    });
  } 
  showCardDetails(card: any) {
    this.cardData = card;
    console.log(this.cardData);
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredUsuarios = this.usuarios.filter(deposito => {
      return deposito.username.toLowerCase().includes(value.toLowerCase());
    });
  }
}

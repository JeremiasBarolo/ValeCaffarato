import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CrearEditarProveedorComponent } from './proveedores/crear-editar-proveedor/crear-editar-proveedor.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CrearEditarEmpleadosComponent } from './empleados/crear-editar/crear-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearEditarClientesComponent } from './clientes/crear-editar/crear-editar-clientes.component';






@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent,
    CrearEditarInsumoComponent,
    InsumosComponent,
    ProveedoresComponent,
    CrearEditarProveedorComponent,
    EmpleadosComponent,
    CrearEditarEmpleadosComponent,
    ClientesComponent,
    CrearEditarClientesComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    ProductosComponent,
    PagesComponent
  ]
})
export class PagesModule { }

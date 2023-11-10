import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearEditarClientesComponent } from './clientes/crear-editar/crear-editar-clientes.component';
import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { CrearEditarPedidosCompraComponent } from './pedidos-compra/crear-editar-pedidos-compra/crear-editar-pedidos-compra.component';






@NgModule({
  declarations: [
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
    InsumosEntityComponent,
    CrearEditarInsumoEntityComponent,
    ProductEntityComponent,
    CrearEditarProductEntityComponent,
    PedidosCompraComponent,
    CrearEditarPedidosCompraComponent,
    DashboardComponent,
    

    
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsuariosComponent,
    ProductosComponent,
    PagesComponent
  ]
})
export class PagesModule { }

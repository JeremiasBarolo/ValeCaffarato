import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CrearEditarProveedorComponent } from './proveedores/crear-editar-proveedor/crear-editar-proveedor.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CrearEditarEmpleadosComponent } from './empleados/crear-editar/crear-editar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearEditarClientesComponent } from './clientes/crear-editar/crear-editar-clientes.component';
import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';
import { CrearEditarPedidoCompraComponent } from './pedidos-compra/crear-editar-pedido-compra/crear-editar-pedido-compra.component';


const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: PedidosCompraComponent },
      { path: 'pedidos-compra', component: PedidosCompraComponent },
      { path: 'pedidos-compra/crear-editar', component: CrearEditarPedidoCompraComponent },
      { path: 'pedidos-compra/crear-editar/:id', component: CrearEditarPedidoCompraComponent },
      { path: 'insumos', component: InsumosComponent },
      { path: 'insumos/crear-editar', component: CrearEditarInsumoComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'proveedores/crear-editar', component: CrearEditarProveedorComponent },
      { path: 'proveedores/crear-editar/:id', component: CrearEditarProveedorComponent },
      { path: 'productos', component: ProductosComponent },
      { path : 'empleados', component : EmpleadosComponent},
      { path: 'empleados/crear-editar', component: CrearEditarEmpleadosComponent },
      { path: 'empleados/crear-editar/:id', component: CrearEditarEmpleadosComponent },
      { path : 'clientes', component : ClientesComponent},
      { path: 'clientes/crear-editar', component: CrearEditarClientesComponent },
      { path: 'clientes/crear-editar/:id', component: CrearEditarClientesComponent },
      { path : 'insumo-entity', component : InsumosEntityComponent},
      { path: 'insumo-entity/crear-editar', component: CrearEditarInsumoEntityComponent },
      { path: 'insumo-entity/crear-editar/:id', component: CrearEditarInsumoEntityComponent },
      { path : 'product-entity', component : ProductEntityComponent},
      { path: 'product-entity/crear-editar', component: CrearEditarProductEntityComponent },
      { path: 'product-entity/crear-editar/:id', component: CrearEditarProductEntityComponent },
      { path: '**', redirectTo: 'dashboard' },

    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes)

  ],

  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }

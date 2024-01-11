import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

import { EmpleadosComponent } from './empleados/empleados.component';

import { ClientesComponent } from './clientes/clientes.component';

import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEditarPedidosCompraComponent } from './pedidos-compra/crear-editar-pedidos-compra/crear-editar-pedidos-compra.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { PedidosVentaComponent } from './pedidos-venta/pedidos-venta.component';
import { CrearEditarPedidoVentaComponent } from './pedidos-venta/crear-editar-pedido-venta/crear-editar-pedido-venta.component';
import { CrearEditarProductosComponent } from './productos/crear-editar-productos/crear-editar-productos.component';
import { PedidosCanceladosComponent } from './pedidos-cancelados/pedidos-cancelados.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { CrearEditarDocumentosComponent } from './documentos/crear-editar-documentos/crear-editar-documentos.component';
import { FacturaRemitoComponent } from './documentos/factura-remito/factura-remito.component';
import { DepositosComponent } from './padrones/depositos/depositos.component';
import { CrearEditarDepositosComponent } from './padrones/depositos/crear-editar-depositos/crear-editar-depositos.component';



const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'pedidos-compra', component: PedidosCompraComponent },
      { path: 'pedidos-compra/crear-editar', component: CrearEditarPedidosCompraComponent },
      { path: 'pedidos-compra/crear-editar/:id', component: CrearEditarPedidosCompraComponent },
      { path: 'pedidos-venta', component: PedidosVentaComponent },
      { path: 'pedidos-venta/crear-editar', component: CrearEditarPedidoVentaComponent },
      { path: 'pedidos-venta/crear-editar/:id', component: CrearEditarPedidoVentaComponent },
      { path: 'pedidos-cancelados', component: PedidosCanceladosComponent },
      { path: 'crear-personas', component: CrearPersonaComponent },
      { path: 'crear-personas/:id', component: CrearPersonaComponent },
      { path: 'insumos', component: InsumosComponent },
      { path: 'insumos/crear-editar', component: CrearEditarInsumoComponent },
      { path: 'insumos/crear-editar/:id', component: CrearEditarInsumoComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'productos', component: ProductosComponent },
      { path : 'empleados', component : EmpleadosComponent},
      { path : 'clientes', component : ClientesComponent},
      { path : 'insumo-entity', component : InsumosEntityComponent},
      { path: 'insumo-entity/crear-editar', component: CrearEditarInsumoEntityComponent },
      { path: 'insumo-entity/crear-editar/:id', component: CrearEditarInsumoEntityComponent },
      { path : 'product-entity', component : ProductEntityComponent},
      { path: 'product-entity/crear-editar', component: CrearEditarProductEntityComponent },
      { path: 'product-entity/crear-editar/:id', component: CrearEditarProductEntityComponent },
      { path : 'productos', component : ProductosComponent},
      { path: 'productos/crear-editar', component: CrearEditarProductosComponent },
      { path: 'productos/crear-editar/:id', component: CrearEditarProductosComponent },
      { path: 'documentos', component: DocumentosComponent },
      { path: 'documentos/crear-editar', component: CrearEditarDocumentosComponent },
      { path: 'documentos/crear-editar/:id', component: CrearEditarDocumentosComponent },
      { path: 'documentos/factura-remito/:id', component: FacturaRemitoComponent },
      { path: 'depositos', component: DepositosComponent },
      { path: 'depositos/crear-editar', component: CrearEditarDepositosComponent },
      { path: 'depositos/crear-editar/:id', component: CrearEditarDepositosComponent },

      


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

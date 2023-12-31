import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { EmpleadosComponent } from './empleados/empleados.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { CrearEditarPedidosCompraComponent } from './pedidos-compra/crear-editar-pedidos-compra/crear-editar-pedidos-compra.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { PedidosVentaComponent } from './pedidos-venta/pedidos-venta.component';
import { CrearEditarPedidoVentaComponent } from './pedidos-venta/crear-editar-pedido-venta/crear-editar-pedido-venta.component';
import { CrearEditarProductosComponent } from './productos/crear-editar-productos/crear-editar-productos.component';
import { PedidosCanceladosComponent } from './pedidos-cancelados/pedidos-cancelados.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { CrearEditarDocumentosComponent } from './documentos/crear-editar-documentos/crear-editar-documentos.component';
import { FacturaRemitoComponent } from './documentos/factura-remito/factura-remito.component';









@NgModule({
  declarations: [

    ProductosComponent,
    PagesComponent,
    CrearEditarInsumoComponent,
    InsumosComponent,
    ProveedoresComponent,
    EmpleadosComponent,
    ClientesComponent,
    InsumosEntityComponent,
    CrearEditarInsumoEntityComponent,
    ProductEntityComponent,
    CrearEditarProductEntityComponent,
    PedidosCompraComponent,
    CrearEditarPedidosCompraComponent,
    DashboardComponent,
    CrearPersonaComponent,
    PedidosVentaComponent,
    CrearEditarPedidoVentaComponent,
    CrearEditarProductosComponent,
    PedidosCanceladosComponent,
    DocumentosComponent,
    CrearEditarDocumentosComponent,
    FacturaRemitoComponent,

    

    
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ProductosComponent,
    PagesComponent
  ]
})
export class PagesModule { }

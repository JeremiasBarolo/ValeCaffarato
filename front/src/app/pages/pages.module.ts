import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { PersonasComponent } from './personas/personas.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { CrearEditarPedidosCompraComponent } from './pedidos-compra/crear-editar-pedidos-compra/crear-editar-pedidos-compra.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { PedidosVentaComponent } from './pedidos-venta/pedidos-venta.component';
import { CrearEditarPedidoVentaComponent } from './pedidos-venta/crear-editar-pedido-venta/crear-editar-pedido-venta.component';
import { CrearEditarProductosComponent } from './productos/crear-editar-productos/crear-editar-productos.component';
import { PedidosCanceladosComponent } from './pedidos-cancelados/pedidos-cancelados.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { CrearEditarDocumentosComponent } from './documentos/crear-editar-documentos/crear-editar-documentos.component';
import { FacturaRemitoComponent } from './documentos/factura-remito/factura-remito.component';
import { DepositosComponent } from './padrones/depositos/depositos.component';
import { CrearEditarDepositosComponent } from './padrones/depositos/crear-editar-depositos/crear-editar-depositos.component';
import { TablaGeograficosComponent } from './padrones/geograficos/tabla-geograficos/tabla-geograficos.component';
import { CrearEditarGeograficosComponent } from './padrones/geograficos/crear-editar-geograficos/crear-editar-geograficos.component';
import { PersonalesComponent } from './padrones/personales/personales.component';
import { CrearEditarPersonalesComponent } from './padrones/personales/crear-editar-personales/crear-editar-personales.component';
import { MonedasComponent } from './padrones/monedas/monedas.component';
import { CrearEditarMonedasComponent } from './padrones/monedas/crear-editar-monedas/crear-editar-monedas.component';

import { TipoPersonaComponent } from './padrones/tipo-persona/tipo-persona.component';
import { UnidadesMedidaComponent } from './padrones/unidades-medida/unidades-medida.component';
import { PaisesComponent } from './padrones/paises/paises.component';
import { ProvinciasComponent } from './padrones/provincias/provincias.component';
import { LocalidadesComponent } from './padrones/localidades/localidades.component';
import { EmpleadosComponent } from './personas/empleados/empleados.component';
import { ClientesComponent } from './personas/clientes/clientes.component';
import { ProovedoresComponent } from './personas/proovedores/proovedores.component';









@NgModule({
  declarations: [

    ProductosComponent,
    PagesComponent,
    CrearEditarInsumoComponent,
    InsumosComponent,
    PersonasComponent,
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
    DepositosComponent,
    CrearEditarDepositosComponent,
    TablaGeograficosComponent,
    CrearEditarGeograficosComponent,
    PersonalesComponent,
    CrearEditarPersonalesComponent,
    MonedasComponent,
    CrearEditarMonedasComponent,

    TipoPersonaComponent,
    UnidadesMedidaComponent,
    PaisesComponent,
    ProvinciasComponent,
    LocalidadesComponent,
    EmpleadosComponent,
    ClientesComponent,
    ProovedoresComponent,

    

    
    
    
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
import { PersonasComponent } from './personas/personas.component';
import { InsumosEntityComponent } from './insumos-entity/insumos-entity.component';
import { CrearEditarInsumoEntityComponent } from './insumos-entity/crear-editar-insumo-entity/crear-editar-insumo-entity.component';
import { ProductEntityComponent } from './product-entity/product-entity.component';
import { CrearEditarProductEntityComponent } from './product-entity/crear-editar-product-entity/crear-editar-product-entity.component';
import { PedidosCompraComponent } from './pedidos-compra/pedidos-compra.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { CrearEditarGeograficosComponent } from './padrones/geograficos/crear-editar-geograficos/crear-editar-geograficos.component';
import { TablaGeograficosComponent } from './padrones/geograficos/tabla-geograficos/tabla-geograficos.component';
import { PersonalesComponent } from './padrones/personales/personales.component';
import { CrearEditarPersonalesComponent } from './padrones/personales/crear-editar-personales/crear-editar-personales.component';
import { MonedasComponent } from './padrones/monedas/monedas.component';
import { CrearEditarMonedasComponent } from './padrones/monedas/crear-editar-monedas/crear-editar-monedas.component';
import { TipoPersonaComponent } from './padrones/tipo-persona/tipo-persona.component';
import { CondicionIvaComponent } from './padrones/condicion-iva/unidades-medida.component';
import { PaisesComponent } from './padrones/paises/paises.component';
import { ProvinciasComponent } from './padrones/provincias/provincias.component';
import { LocalidadesComponent } from './padrones/localidades/localidades.component';
import { BancosComponent } from './padrones/bancos/bancos.component';
import { ProovedoresComponent } from './personas/proovedores/proovedores.component';
import { ClientesComponent } from './personas/clientes/clientes.component';
import { EmpleadosComponent } from './personas/empleados/empleados.component';
import { AuthGuard  } from '../auth/auth';
import { UsuariosComponent } from './personas/usuarios/usuarios.component';
import { UnidadesMedidaComponent } from './padrones/unidades-medida/unidades-medida.component';





const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'inicio', component: DashboardComponent},
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
      { path: 'productos', component: ProductosComponent },
      { path : 'personas', component : PersonasComponent},
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
      { path: 'geograficos', component: TablaGeograficosComponent },
      { path: 'geograficos/crear-editar', component: CrearEditarGeograficosComponent },
      { path: 'geograficos/crear-editar/:id', component: CrearEditarGeograficosComponent },
      { path: 'personales', component: PersonalesComponent },
      { path: 'personales/crear-editar', component: CrearEditarPersonalesComponent },
      { path: 'personales/crear-editar/:id', component: CrearEditarPersonalesComponent },
      { path: 'monedas', component: MonedasComponent },
      { path: 'monedas/crear-editar', component: CrearEditarMonedasComponent },
      { path: 'monedas/crear-editar/:id', component: CrearEditarMonedasComponent },
      { path: 'tipo-personas', component: TipoPersonaComponent },
      { path: 'condicion-iva', component: CondicionIvaComponent },
      { path: 'paises', component: PaisesComponent },
      { path: 'provincias', component: ProvinciasComponent },
      { path: 'localidades', component: LocalidadesComponent },
      { path: 'proveedores', component: ProovedoresComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'bancos', component: BancosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'unidades-medida', component: UnidadesMedidaComponent },
      
      


      


      { path: '**', redirectTo: 'inicio' },

    ],
    canActivate: [AuthGuard ]

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

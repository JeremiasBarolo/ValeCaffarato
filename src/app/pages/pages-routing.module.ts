import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { InsumosComponent } from './insumos/insumos.component';
import { CrearEditarInsumoComponent } from './insumos/crear-editar-insumo/crear-editar-insumo.component';
const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'usuarios', component: DashboardComponent },
      { path: 'insumos', component: InsumosComponent },
      { path: 'insumos/crear-editar', component: CrearEditarInsumoComponent },
      { path: 'productos', component: ProductosComponent },
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

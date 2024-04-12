import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TablaDetallesComponent } from './tabla-detalles/tabla-detalles.component';
import { TableModule } from 'primeng/table';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    TablaDetallesComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    FontAwesomeModule,
    TablaDetallesComponent
  ],
  providers: [],
})
export class SharedModule { }

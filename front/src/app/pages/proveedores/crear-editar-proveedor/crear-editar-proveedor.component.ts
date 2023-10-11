import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-proveedor',
  templateUrl: './crear-editar-proveedor.component.html',
  styleUrls: ['./crear-editar-proveedor.component.css']
})
export class CrearEditarProveedorComponent {

  constructor(private titleService: TitleService) {}
	
	ngOnInit(): void {
		this.titleService.setTitle('Crear Proveedores');
	} 

}

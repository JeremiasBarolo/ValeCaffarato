import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-insumo',
  templateUrl: './crear-editar-insumo.component.html',
  styleUrls: ['./crear-editar-insumo.component.css']
})
export class CrearEditarInsumoComponent {
  
  constructor(private titleService: TitleService) {}
	
	ngOnInit(): void {
		this.titleService.setTitle('Crear Insumos');
	} 

}

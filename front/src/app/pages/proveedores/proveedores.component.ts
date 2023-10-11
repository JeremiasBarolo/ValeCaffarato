import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  constructor(private titleService: TitleService) {}
	
	ngOnInit(): void {
		this.titleService.setTitle('Proveedores');
	} 

}

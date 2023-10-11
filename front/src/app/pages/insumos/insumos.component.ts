import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';


@Component({
	
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']

})
export class InsumosComponent {
	constructor(private titleService: TitleService) {}
	
	ngOnInit(): void {
		this.titleService.setTitle('Insumos');
	} 

	
}
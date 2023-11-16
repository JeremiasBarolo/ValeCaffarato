import { Component } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';

import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  proveedores: Persona[] = [];
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService, private titleService: TitleService) { }

  ngOnInit(): void {
  this.titleService.setTitle('Proveedores');
  this.personasService.getAll().subscribe(persona => {
    let proveedores = persona.filter((persona) => persona.categoria === 'PROVEEDOR');
    this.proveedores = proveedores;
    
  })
}

showCardDetails(card: any) {
    
  this.cardData = card;  
  console.log(this.cardData);
}

  deleteProveedor(id: any) {
    this.personasService.delete(id).subscribe(() => {
      this.proveedores = this.proveedores.filter(e => e.id !== id);
    });
  }
}

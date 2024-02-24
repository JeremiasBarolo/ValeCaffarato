import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';

import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-proovedores',
  templateUrl: './proovedores.component.html',
  styleUrls: ['./proovedores.component.css']
})
export class ProovedoresComponent {
  proveedores: any[] = [];
  persona: any;
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.personasService.getAll().subscribe(persona => {
      persona.forEach(element => {
        if(element.Tipo_Persona.description === 'Proveedor'){
          this.proveedores.push(element)
        }
      }
      )
    })
      



  this.titleService.setTitle('Proveedores');
  }

  showCardDetails(card: any) {
    
    this.cardData = card;  
    console.log('data',this.cardData);
  }

  deleteEmpleado(id: any, event: Event) {
    event.stopPropagation(); 
  
    this.personasService.delete(id).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600);
    });
  }
}

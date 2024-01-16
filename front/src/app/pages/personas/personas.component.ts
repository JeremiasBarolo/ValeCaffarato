import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';

import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  empleados: any[] = [];
  persona: any;
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.personasService.getAll().subscribe(persona => {
      this.empleados = persona.map((data) => ({
        ...data,
        Tipo_Persona: data.Tipo_Persona || { description: 'Sin Tipo' }
        
      }));
      
    },
    (error) => {
      console.error('Error al obtener datos:', error);
    }
      
    )



  this.titleService.setTitle('Personas');
  }

  showCardDetails(card: any) {
    
    this.cardData = card;  
    console.log(this.cardData);
  }

  deleteEmpleado(id: any) {
    this.personasService.delete(id).subscribe(() => {
      this.empleados = this.empleados.filter(e => e.id !== id);
    });
  }
}

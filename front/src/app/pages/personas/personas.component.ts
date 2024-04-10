import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';



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
  
  constructor( private personasService: PersonasService, ) { }

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




  }

  showCardDetails(card: any) {
    
    this.cardData = card;  
    
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

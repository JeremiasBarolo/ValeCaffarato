import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';



@Component({
  selector: 'app-proovedores',
  templateUrl: './proovedores.component.html',
  styleUrls: ['./proovedores.component.css']
})
export class ProovedoresComponent {
  breadcrumbItems: string = 'Proveedores'
  proveedores: any[] = [];
  persona: any;
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService ) { }

  ngOnInit(): void {
    this.personasService.getAll().subscribe(persona => {
      persona.forEach(element => {
        if(element.Tipo_Persona.description === 'Proveedor'){
          this.proveedores.push(element)
        }
      }
      )
    })
      




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

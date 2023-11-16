import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';

import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: any[] = [];
  persona: any;
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.personasService.getAll().subscribe(persona => {
      let empleados = persona.filter((persona) => persona.categoria === 'EMPLEADO');
      this.empleados = empleados;
      
    })



  this.titleService.setTitle('Empleados');
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

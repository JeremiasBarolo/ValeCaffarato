import { Component } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Persona[] = [];
  cardData: any = {
    name: ''
  }
  
  constructor( private personasService: PersonasService, private titleService: TitleService) { }

  ngOnInit(): void {
  this.titleService.setTitle('Clientes');
  this.personasService.getAll().subscribe(persona => {
    let clientes = persona.filter((persona) => persona.categoria === 'CLIENTE');
    this.clientes = clientes;
    
  })
}

showCardDetails(card: any) {
    
  this.cardData = card;  
  console.log(this.cardData);
}

  

  deleteCliente(id: any) {
    this.personasService.delete(id).subscribe(() => {
      this.clientes = this.clientes.filter(e => e.id !== id);
    });
  }
}

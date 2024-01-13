import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-tabla-geograficos',
  templateUrl: './tabla-geograficos.component.html',
  styleUrls: ['./tabla-geograficos.component.css']
})
export class TablaGeograficosComponent {
  clientes: Persona[] = [];
  cardData: any = {
    name: ''
  }
  selectedOption:string | undefined 
  
  constructor( 
    private personasService: PersonasService, 
    private titleService: TitleService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  this.titleService.setTitle('Padrones Geograficos');
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

  onAceptarClick() {
    this.router.navigate(['dashboard/geograficos/crear-editar', {id: this.selectedOption} ]);
  }
}

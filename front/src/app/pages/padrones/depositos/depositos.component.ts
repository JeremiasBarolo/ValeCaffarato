import { Component } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { DepositosService } from 'src/app/services/depositos.service';
import { PersonasService } from 'src/app/services/personas.service';


@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css']
})
export class DepositosComponent {
  breadcrumbItems: string = 'Depositos'
  depositos: any[] = [];
  cardData: any = {
    name: ''
  }
  
  constructor( private depositosService: DepositosService,) { }

  ngOnInit(): void {
 
  this.depositosService.getAll().subscribe(deposito => {
    this.depositos = deposito;
    
  })
}

showCardDetails(card: any) {
    
  this.cardData = card;  
  console.log(this.cardData);
}

  

  deleteCliente(id: any) {
    this.depositosService.delete(id).subscribe(() => {
      this.depositos = this.depositos.filter(e => e.id !== id);
    });
  }
}

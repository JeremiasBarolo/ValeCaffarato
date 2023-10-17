import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  
  constructor( private clienteService: ClientesService, private titleService: TitleService) { }

  ngOnInit(): void {
  this.clienteService.getAll().subscribe(cliente => this.clientes = cliente);
  this.titleService.setTitle('Clientes');
  }

  deleteCliente(id: any) {
    this.clienteService.delete(id).subscribe(() => {
      this.clientes = this.clientes.filter(e => e.id !== id);
    });
  }
}

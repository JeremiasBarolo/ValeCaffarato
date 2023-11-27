import { Component } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {

 constructor(private pedidosService: PedidosService ) {}

  pedido: any = {};

  ngOnInit() {
    // Llamada a la API de Node.js para obtener los datos del pedido
    this.pedidosService.getById(1).subscribe(data => {
      this.pedido = data;
    })
  }
}

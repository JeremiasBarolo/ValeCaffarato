import { Component, OnInit } from '@angular/core';
import { CompraFinalizacionService } from 'src/app/services/compra-finalizacion.service';
import { CompraPreparacionService } from 'src/app/services/compra-preparacion.service';
import { CompraPresupuestoService } from 'src/app/services/compra-presupuesto.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos-compra.component.html',
  styleUrls: ['./pedidos-compra.component.css']
})
export class PedidosCompraComponent implements OnInit {

  listPresupuesto: any[] = [];
  listPreparacion: any[] = [];
  listFinalizacion: any[] = [];

  constructor(
    private titleService: TitleService,
    private compraPreparacionService: CompraPreparacionService,
    private compraPresupuestoService: CompraPresupuestoService,
    private compraFinalizacionService: CompraFinalizacionService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Pedidos Compra');
    this.compraPresupuestoService.getAll().subscribe(data => this.listPresupuesto = data);
    this.compraPreparacionService.getAll().subscribe(data => this.listPreparacion = data);
    this.compraFinalizacionService.getAll().subscribe(data => this.listFinalizacion = data);
    console.log(this.listPresupuesto);
    console.log(this.listPreparacion);
    console.log(this.listFinalizacion);
  }
}
  

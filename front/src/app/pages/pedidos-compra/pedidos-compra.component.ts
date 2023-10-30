import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InsumoEntity } from 'src/app/models/insumo-entity';
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
  cardData: any = {
    name: ''
  }

  constructor(
    private titleService: TitleService,
    private compraPreparacionService: CompraPreparacionService,
    private compraPresupuestoService: CompraPresupuestoService,
    private compraFinalizacionService: CompraFinalizacionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller

    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Pedidos Compra');
    this.compraPresupuestoService.getAll().subscribe(data => this.listPresupuesto = data);
    this.compraPreparacionService.getAll().subscribe(data => this.listPreparacion = data);
    this.compraFinalizacionService.getAll().subscribe(data => this.listFinalizacion = data);
    this.route.paramMap.subscribe((params) => {
      this.viewport.scrollToPosition([0,0]);
    });
    console.log(this.listPresupuesto);
    
  }

  cambiarEstado(id: number, estado: string, pedido: any) {
    if (estado === 'PREPARACION') {
      this.compraPreparacionService.create(pedido).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} en preparación...`);
        setTimeout(() => {
          window.location.reload();
        }, 1500); 
      });
    } else {
      this.compraFinalizacionService.create(pedido).subscribe(() => {
        this.toastr.success(`Pedido ${pedido.name} listo para finalizar `);
        setTimeout(() => {
          window.location.reload();
        }, 1500); 
      });
    }
  }

  
showCardDetails(card: any) {
    this.cardData = card;
}

updateEntidad(id:number){
  this.router.navigate(['dashboard/pedidos-compra/crear-editar', id]);
}

finalizaPedido(id: number) {
    this.compraFinalizacionService.delete(id).subscribe(() => {
      this.toastr.success(`Pedido finalizado`);
      setTimeout(() => {
        window.location.reload();
      }, 1500); 
    });
  }


}
  

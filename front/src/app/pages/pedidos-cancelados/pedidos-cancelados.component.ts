import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Pedidos } from 'src/app/models/pedidos'
import { PedidosService } from 'src/app/services/pedidos.service';


@Component({
  selector: 'app-pedidos-cancelados',
  templateUrl: './pedidos-cancelados.component.html',
  styleUrls: ['./pedidos-cancelados.component.css']
})
export class PedidosCanceladosComponent {
  listCancelado: any[] = []
  filteredProductos: any = []
  breadcrumbItems: string = 'Pedidos Cancelados'
  cardData: any = {}
  private destroy$ = new Subject<void>();

  constructor(
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private router: Router,
    ) {
    
  }
  
  ngOnInit(): void {
    this.pedidosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.state === 'CANCELADO'){
            
            
            this.listCancelado.push(element);
            this.filteredProductos = this.listCancelado;
          
        }
    })
    });
  }

  showCardDetails(card: Pedidos) {
    this.cardData = card;
    
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  eliminarPedido(id?: number){
    this.pedidosService.delete(id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success('Entidad eliminado exitosamente')
      setTimeout(() => {
        window.location.reload();
      }, 600)
      
  
    })
  }

  navigateToDetalle(id: any) {
    this.router.navigate(['/dashboard/detalle-pedido', id]);
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProductos = this.listCancelado.filter(insumo => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

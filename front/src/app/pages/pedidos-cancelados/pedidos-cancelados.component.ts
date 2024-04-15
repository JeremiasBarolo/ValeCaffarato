import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from 'src/app/models/pedidos'
import { PedidosService } from 'src/app/services/pedidos.service';


@Component({
  selector: 'app-pedidos-cancelados',
  templateUrl: './pedidos-cancelados.component.html',
  styleUrls: ['./pedidos-cancelados.component.css']
})
export class PedidosCanceladosComponent {
  listCancelado: Pedidos[] = []
  breadcrumbItems: string = 'Pedidos Cancelados'
  cardData: any = {
    name: '',
    description: '',
    subtotal: 0,
    state: '',
    category: '',
    insumos: [],
    productos: []
  }
  constructor(
    private pedidosService: PedidosService,
    private toastr: ToastrService
    ) {
    
  }
  
  ngOnInit(): void {
    this.pedidosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.state === 'CANCELADO'){
            console.log(element);
            
            this.listCancelado.push(element);
          
        }
    })
    });
  }

  showCardDetails(card: Pedidos) {
    this.cardData = card;
    
    
  }

  eliminarPedido(id?: number){
    this.pedidosService.delete(id!).subscribe(() => {
      this.toastr.success('Entidad eliminado exitosamente')
      setTimeout(() => {
        window.location.reload();
      }, 600)
      
  
    })
  }

}

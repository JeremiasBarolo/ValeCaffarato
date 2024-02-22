import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Persona } from 'src/app/models/Persona';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PersonasService } from 'src/app/services/personas.service';


@Component({
  selector: 'app-factura-remito',
  templateUrl: './factura-remito.component.html',
  styleUrls: ['./factura-remito.component.css']
})
export class FacturaRemitoComponent implements OnInit {
  id: number;
  documentoData: any = {}
  productData: any = []
  subtotal: any[] = []
  totalFinal: number = 0
  clienteData: any = {
    name: '',
    id: 0,
    email: '',
    phone: 0,
    adress: '',
    dni: 0,
    cuit: 0,
    lastname: '',
    categoria: '',
    adress_number: 0,
    industry: '',
    cuil: '',
    adressNumber: 0,
    cliente: undefined,
    proveedor: undefined,
    Localidad:undefined
  }
  constructor(
    private documentosService: DocumentosService, 
    private aRoute: ActivatedRoute, 
    private pedidosService: PedidosService,
    private personasService: PersonasService,
    private toastr: ToastrService
    ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));

  }
  
  
  ngOnInit(): void {
    this.documentosService.getById(this.id).subscribe(data => {
        this.documentoData = data;
        console.log(this.documentoData);

        const requests = this.documentoData.Pedidos.map((element: any) =>
            this.pedidosService.getById(element.id)
        );

        forkJoin(requests).subscribe((pedidosData: any) => {
            pedidosData.forEach((data: any) => {
                this.productData.push(data.productos);
            });

            console.log('productos:', this.productData);
        });

        this.documentoData.Personas.forEach((persona: any) => {
          this.personasService.getById(persona.id).subscribe(data =>{
            this.clienteData = data
            console.log(this.clienteData);
            
          })
        })
    });
    
    
    
    
}

  calcularTotal(precio: number, cantidad: number){
    let total= 0
    total = precio*cantidad
    return total
  }

  totalIva(precio: number, cantidad: number, iva: number): number {
    const total = this.calcularTotal(precio, cantidad);
    const totalIva = (total * iva) / 100 + total;

    return totalIva;
}

subtotalReal(): number {
    const subtotales: number[] = [];

    this.productData.forEach((productList: any) => {
        productList.forEach((item: any) => {
            const iva = this.documentoData.iva || 0; 
            const subtotal = this.totalIva(item.costo_unit, item.PedidosProductos.quantity_requested, iva);
            subtotales.push(subtotal);
        });
    });

    const suma = subtotales.reduce((acumulador, numero) => acumulador + numero, 0);
    this.totalFinal = suma;
    return suma;
}

generarDocumento(){
  
  this.documentosService.generarPdf( this.documentoData,this.productData, this.clienteData, this.totalFinal).subscribe(data =>{
    this.toastr.success('Factura Creada Exitosamente');
  })
}


}

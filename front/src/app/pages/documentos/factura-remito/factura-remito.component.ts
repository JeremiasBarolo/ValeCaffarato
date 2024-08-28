import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Persona } from 'src/app/models/Persona';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PersonasService } from 'src/app/services/personas.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-factura-remito',
  templateUrl: './factura-remito.component.html',
  styleUrls: ['./factura-remito.component.css']
})
export class FacturaRemitoComponent implements OnInit {
  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;
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
        

        const requests = this.documentoData.Pedidos.map((element: any) =>
            this.pedidosService.getById(element.id)
        );
        
        
        forkJoin(requests).subscribe((pedidosData: any) => {
            pedidosData.forEach((data: any) => {
                console.log(data);
                
                this.productData.push(data.productos);
            });

            
        });

        this.documentoData.Personas.forEach((persona: any) => {
          this.personasService.getById(persona.id).subscribe(data =>{
            this.clienteData = data
            
            
          })
        })
    });
    
    
    
    
}

  calcularTotal(precio: number, cantidad: number, iva:number){
    let total= 0
    total = precio*cantidad
    let subtotalReal = total + (total * iva / 100)
    return subtotalReal
  }




generarDocumento() {
  const data = this.pdfContent.nativeElement;
  const titles = data.querySelectorAll('h3, h5, h6');
  titles.forEach((title: HTMLElement) => {
    title.classList.add('pdf-title');
  });

  html2canvas(data, { scale: 2 }).then(canvas => {
    const imgWidth = 180; // Ajusta el ancho de la imagen para dejar márgenes
    const pageWidth = 210; // Ancho de la página A4 en mm
    const margin = (pageWidth - imgWidth) / 2; // Cálculo del margen

    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(contentDataURL, 'PNG', margin, 10, imgWidth, imgHeight);
    pdf.save(`${this.documentoData.tipo}-${this.clienteData.name}-${this.clienteData.lastname}-${Date.now()}.pdf`);

    titles.forEach((title: HTMLElement) => {
      title.classList.remove('pdf-title');
    });
  });
}



}

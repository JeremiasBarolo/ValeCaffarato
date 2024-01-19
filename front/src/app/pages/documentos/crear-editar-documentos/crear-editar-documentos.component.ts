import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { DocumentosService } from 'src/app/services/documentos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-documentos',
  templateUrl: './crear-editar-documentos.component.html',
  styleUrls: ['./crear-editar-documentos.component.css']
})
export class CrearEditarDocumentosComponent {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  selectedPedidos: any[] = [];
  Pedidos: any[] = [];
  Clientes: any[] = [];
  subtotal: number[] = [];
  documentoData: any = {
    iva: 21,
    condicionIva: '',
    total: 0,
    totalIva: 0,
    tipo: '',
    cliente: 0,
    pedido: [],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private titleService: TitleService,
    private toastr: ToastrService,
    private personasService: PersonasService,
    private documentoService: DocumentosService
  ) {
    this.form = this.fb.group({
      selectedOptionPersona: ['', Validators.required],
      selectedOptionDocumento: ['', Validators.required],
      selectedOptionCondicion: ['', Validators.required], 
    });
    
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadSelectedProducts();
    this.titleService.setTitle('Pedidos Compra');
    console.log(this.selectedPedidos);
    console.log(this.Pedidos);
    this.pedidosService.getAll().subscribe(data =>{
      data.forEach(
        (element: any) => {
          if(element.state === 'FINALIZADO' && element.category === 'VENTA'){
            this.Pedidos.push(element);
          
          }
        }      
      );
    });

    this.personasService.getAll().subscribe(persona => {
      this.Clientes = persona
      console.log(this.Clientes);
    });
    


    
    
  }

  addDocumento() {
    this.documentoData.pedido = this.selectedPedidos.map(entity => ({ id: entity.id}));
    this.documentoData.tipo = this.form.value.selectedOptionDocumento;
    this.documentoData.cliente = parseInt(this.form.value.selectedOptionPersona, 10);
    this.documentoData.condicionIva = this.form.value.selectedOptionCondicion;

    

    if (this.id !== 0) {
      try {
        this.documentoService.update(this.id, this.documentoData).subscribe(() => {
          this.router.navigate(['dashboard/documentos']);
          this.toastr.success('Pedido Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.documentoService.create(this.documentoData).subscribe(() => {
          this.router.navigate(['dashboard/documentos']);
          this.toastr.success('Pedido Creado Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  selectedEntity(insumoEntity: any) {
    insumoEntity.cantidad = 1;
    this.selectedPedidos.push(insumoEntity);
  
    const index = this.Pedidos.findIndex(p => p.id === insumoEntity.id);
    if (index !== -1) {
      this.Pedidos.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedPedidos));
  
  }

  
  returnEntities(Entities: any) {
    this.Pedidos.push(Entities);
    const index = this.selectedPedidos.findIndex(p => p.id === Entities.id);
    if (index !== -1) {
      this.selectedPedidos.splice(index, 1);
    }
  }

  loadAllEntities() {
    this.pedidosService.getAll().subscribe((data) => {
      
      this.Pedidos = data.filter(insumo => !this.selectedPedidos.some(selected => selected.id === insumo.id));
    })
  }
  loadSelectedProducts() {
    if (this.id) {
      this.pedidosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
            this.selectedPedidos = [...res.InsumosEntities];
            this.Pedidos = this.Pedidos.filter(insumo => !this.selectedPedidos.some(selected => selected.id === insumo.id));
          }
        }
      )
    }
  }

  
  

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra } from 'src/app/models/pedidoCompra';
import { CompraPresupuestoService } from 'src/app/services/compra-presupuesto.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-pedido-compra',
  templateUrl: './crear-editar-pedido-compra.component.html',
  styleUrls: ['./crear-editar-pedido-compra.component.css']
})
export class CrearEditarPedidoCompraComponent {
  PedidoCompra: PedidoCompra | any;
  listPedidoCompras: Observable<PedidoCompra[]> = new Observable<PedidoCompra[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  PedidoCompraData: PedidoCompra | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private compraPresupuestoService: CompraPresupuestoService,
    private titleService: TitleService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      subtotal: ['', Validators.required],
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar PedidoCompras');
      console.log(this.id);
      
      this.getPedidoCompra(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear PedidoCompras');
      
    }   
  }

  addPedidoCompra() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('subtotal', this.form.value.subtotal);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.PedidoCompra = {
        name: this.form.value.name,
        description: this.form.value.description,
        subtotal: this.form.value.subtotal,
      };
      if (this.id !== 0) {
        // Es editar
        try {
          this.compraPresupuestoService.update(this.id, this.PedidoCompra).subscribe(() => {
            this.router.navigate(['dashboard/pedidos-compra']);
            this.toastr.success('Pedido Actualizado');
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.compraPresupuestoService.create(this.PedidoCompra).subscribe(() => {
            this.router.navigate(['dashboard/pedidos-compra']);
            this.toastr.success('Pedido Creado Exitosamente');
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getPedidoCompra(id: number) {
    this.compraPresupuestoService.getById(id).subscribe((data: PedidoCompra)=> {
      let PedidoCompra: PedidoCompra = {
        id: data.id,
        name: data.name,
        description: data.description,
        subtotal: data.subtotal,
      
      };
  
      this.PedidoCompraData = PedidoCompra;

      this.form.setValue({
        id: data.id,
        name: data.name,
        description: data.description,
        subtotal: data.subtotal,
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Super pedido de Cajas',
        description: 'Cajones negros',
        subtotal: 12112,
        
    });
  }
}

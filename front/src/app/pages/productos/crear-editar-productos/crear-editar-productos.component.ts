import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { InsumoService } from 'src/app/services/insumo.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductEntityService } from 'src/app/services/product-entity.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-productos',
  templateUrl: './crear-editar-productos.component.html',
  styleUrls: ['./crear-editar-productos.component.css']
})
export class CrearEditarProductosComponent {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  productoData: any = {
    name: '',
    description: '',
    measurement_height: '',
    measurement_length: '',
    measurement_depth: '',
    price: '',
    profit: '',
    insumos: [],
    unidad_medida: '',
  };
  ProductEntityData: any;

  constructor(
    private insumoService: InsumoService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private productService: ProductosService,
    private titleService: TitleService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      measurement_height: ['', Validators.required],
      measurement_length: ['', Validators.required],
      measurement_depth: ['', Validators.required],
      profit: ['', Validators.required],
      price: ['', Validators.required],
      unidad_medida: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Productos');
    if (this.id !== null) {
      this.titleService.setTitle('Editar Producto');
      console.log(this.id);
      this.getProductEntity(this.id);
    } else{
      this.titleService.setTitle('Crear Producto');
      
    }  

  

    
    
  }

  addProducto() {
    
    this.productoData.name = this.form.value.name;    
    this.productoData.description = this.form.value.description;    
    this.productoData.measurement_height = this.form.value.measurement_height;    
    this.productoData.measurement_length = this.form.value.measurement_length;    
    this.productoData.measurement_depth = this.form.value.measurement_depth;    
    this.productoData.profit = this.form.value.profit;    
    this.productoData.price = this.form.value.price;    
    this.productoData.unidad_medida = this.form.value.unidad_medida;    
    this.productoData.cantidad = this.form.value.cantidad;
    this.productoData.admin = 'yes';
    

    if (this.id !== 0) {
      try {
        this.productService.update(this.id, this.productoData
      ).subscribe(() => {
          this.router.navigate(['dashboard/productos']);
          this.toastr.success('Entidad Actualizada');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.productService.create(this.productoData
      ).subscribe(() => {
          this.router.navigate(['dashboard/productos']);
          this.toastr.success('Entidad Creada Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }


  rellenardatos() {
    this.form.setValue({
        name: 'Super pedido de Cajas',
        description: 'Cajones negros',
        measurement_height: '10',
        measurement_length: '10',
        measurement_depth: '10',
        profit: '10',
        price: '10',
        unidad_medida: 'Unidad',
        cantidad: '10'
        
    });
  }
  getProductEntity(id: number) {
    this.productService.getById(id).subscribe((data: any)=> {
      let ProductEntity: any = {
        name: data.name,
        description: data.description,
        price: data.price,
        unidad_medida: data.unidad_medida
        
      };
  
      this.ProductEntityData = ProductEntity;

      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        unidad_medida: data.unidad_medida,
        profit: data.profit,
        measurement_height: data.measurement_height,
        measurement_length: data.measurement_length,
        measurement_depth: data.measurement_depth

      });
    });
}
}

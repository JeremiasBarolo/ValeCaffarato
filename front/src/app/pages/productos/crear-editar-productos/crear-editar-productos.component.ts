import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-productos',
  templateUrl: './crear-editar-productos.component.html',
  styleUrls: ['./crear-editar-productos.component.css']
})
export class CrearEditarProductosComponent implements OnInit {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  productos: any[] = [];
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

  dataCreate: any = {
    id: 0,
    cantidad: 0,
    admin: 'yes'
  }

  constructor(
    private maestroArticulosService: MaestroArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private productService: ProductosService,
    private titleService: TitleService,
    private toastr: ToastrService
  ) {
    if(this.aRoute.snapshot.paramMap.get('id') !== null){
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
      
    }
    else{
      this.form = this.fb.group({
        cantidad: ['', Validators.required],
        insumoEntity: ['', Validators.required],
      });
  }


    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities()
    

    if (this.id !== null) {
      this.titleService.setTitle('Editar Producto');
      console.log(this.id);
      this.getProduct(this.id);
    } else{
      this.titleService.setTitle('Crear Producto'); 
      
      
      
    }  

  

    
    
  }

  addProducto() {

    if (this.id !== 0) {
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
        console.log(this.productoData);
        
      try {
        this.productService.update(this.id, {...this.productoData}).subscribe(() => {
          this.router.navigate(['dashboard/productos']);
          this.toastr.success('Entidad Actualizada');
        });
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {

        this.dataCreate.id = this.form.value.insumoEntity;
        this.dataCreate.cantidad = this.form.value.cantidad;
        this.dataCreate.admin = 'yes';


        this.productService.create(this.dataCreate
      ).subscribe(() => {
          this.router.navigate(['dashboard/productos']);
          this.toastr.success('Entidad Creada Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
  }
}

  getProduct(id: number) {
    this.productService.getById(id).subscribe((data: any)=> {
        
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        unidad_medida: data.unidad_medida,
        profit: data.profit,
        measurement_height: data.measurement_height,
        measurement_length: data.measurement_length,
        measurement_depth: data.measurement_depth,
        cantidad: data.quantity

      });
    });
}
  
  loadAllEntities() {
    this.maestroArticulosService.getAll().subscribe((data) => {

      data.forEach((entity: any) => {
        if(entity.tipoArticulo === 'PRODUCTO'){
          this.productos.push(entity);
        }
      })
    })
  }
}

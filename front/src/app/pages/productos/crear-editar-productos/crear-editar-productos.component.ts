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
    id: 0
  };

  dataCreate: any = {
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
        profit: ['', Validators.required],
        costo_unit: ['', Validators.required],
        unidad_medida: ['', Validators.required],
        quantity: ['', Validators.required],
      });
      
    }
    else{
      
      this.form = this.fb.group({
        quantity: ['', Validators.required],
        entidad: ['', Validators.required],
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
        this.productoData.profit = this.form.value.profit;    
        this.productoData.costo_unit = this.form.value.costo_unit;    
        this.productoData.unidad_medida = this.form.value.unidad_medida;    
        this.productoData.quantity = this.form.value.quantity;
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

        this.dataCreate.id = this.form.value.entidad;
        this.dataCreate.quantity = this.form.value.quantity;
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
        costo_unit: data.costo_unit,
        unidad_medida: data.unidad_medida,
        profit: data.profit,
        quantity: data.quantity

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

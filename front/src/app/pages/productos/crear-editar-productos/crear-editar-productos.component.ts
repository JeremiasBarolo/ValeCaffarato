import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { DepositosService } from 'src/app/services/depositos.service';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';


@Component({
  selector: 'app-crear-editar-productos',
  templateUrl: './crear-editar-productos.component.html',
  styleUrls: ['./crear-editar-productos.component.css']
})
export class CrearEditarProductosComponent implements OnInit {
  breadcrumbItems: string = 'Crear/Editar Stock PT'
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
  depositos: any[] =[]
  unidadesMedida: any[] = [];

  constructor(
    private maestroArticulosService: MaestroArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private productService: ProductosEnStockService,
    private depositoService: DepositosService,
    private unidadMedidaService: UnidadMedidaService,
    private toastr: ToastrService
  ) {
    if(this.aRoute.snapshot.paramMap.get('id') !== null){
      
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        profit: ['', Validators.required],
        costo_unit: ['', Validators.required],
        uni_medida: ['', Validators.required],
        quantity: ['', Validators.required],
        deposito: ['', Validators.required],
      });
      
    }
    else{
      
      this.form = this.fb.group({
        quantity: ['', Validators.required],
        entidad: ['', Validators.required],
        deposito: ['', Validators.required],
      });
  }


    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities()
    

    if (this.id !== null) {
      
      
      this.getProduct(this.id);
    } else{
      
      
      
      
    }  

  

    
    
  }

  addProducto() {

    if (this.id !== 0) {
        this.productoData.name = this.form.value.name;    
        this.productoData.description = this.form.value.description;       
        this.productoData.profit = this.form.value.profit;    
        this.productoData.costo_unit = this.form.value.costo_unit;    
        this.productoData.uni_medida = this.form.value.uni_medida;    
        this.productoData.quantity = this.form.value.quantity;
        this.productoData.type = 'PRODUCTO';
        this.productoData.depositoId = this.form.value.deposito;
        this.productoData.admin = 'yes';
        
        
      try {
        this.productService.update(this.id, {...this.productoData, type: 'PRODUCTO'}).subscribe(() => {
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
        this.dataCreate.depositoId = this.form.value.deposito,
        this.dataCreate.admin = 'yes';
        this.productoData.type = 'PRODUCTO';


        this.productService.create({...this.dataCreate, type:'PRODUCTO' }
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
        uni_medida: data.uni_medida,
        profit: data.profit,
        quantity: data.quantity,
        deposito: data.deposito.id

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
    

    this.depositoService.getAll().subscribe((data) => {
      this.depositos = data
    })
    
    this.unidadMedidaService.getAll().subscribe((data) => {
      this.unidadesMedida = data
    })
  }

  
}

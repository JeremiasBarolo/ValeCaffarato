import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { InsumoService } from 'src/app/services/insumo.service';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { TitleService } from 'src/app/services/title.service';




@Component({
  selector: 'app-crear-editar-product-entity',
  templateUrl: './crear-editar-product-entity.component.html',
  styleUrls: ['./crear-editar-product-entity.component.css']
})
export class CrearEditarProductEntityComponent {
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  id: number;
  selectedEntities: Insumo[] = [];
  Insumos: Insumo[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
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
    private maestroArticulosService: MaestroArticulosService,
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
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities();
    this.loadSelectedProducts();
    this.titleService.setTitle('Entidades de Producto');
    console.log(this.selectedEntities);
    console.log(this.Insumos);
    if (this.id !== null) {
      this.titleService.setTitle('Editar Entidad de Insumo');
      console.log(this.id);
      this.getProductEntity(this.id);
    } else{
      this.titleService.setTitle('Crear Entidad de Insumo');
      
    }  

  

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.insumos = this.selectedEntities.map(entity => ({ id: entity.id, quantity: entity.quantity }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;
    this.presupuestoData.measurement_height = this.form.value.measurement_height;
    this.presupuestoData.measurement_length = this.form.value.measurement_length;
    this.presupuestoData.measurement_depth = this.form.value.measurement_depth;
    this.presupuestoData.profit = this.form.value.profit;
    this.presupuestoData.price = this.form.value.price;
    this.presupuestoData.unidad_medida = this.form.value.unidad_medida;
    

    if (this.id !== 0) {
      try {
        this.maestroArticulosService.update(this.id, this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/product-entity']);
          this.toastr.success('Entidad Actualizada');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.maestroArticulosService.create(this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/product-entity']);
          this.toastr.success('Entidad Creada Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  selectedEntity(Product: Insumo) {
    Product.quantity = 1;
    this.selectedEntities.push(Product);
  
    const index = this.Insumos.findIndex(p => p.id === Product.id);
    if (index !== -1) {
      this.Insumos.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  
  }

  
  returnEntities(product: any) {
    this.Insumos.push(product);
    const index = this.selectedEntities.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.selectedEntities.splice(index, 1);
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
        unidad_medida: 'Unidad'
        
    });
  }
  loadAllEntities() {
    this.insumoService.getAll().subscribe((data) => {
      data.forEach((entity: any) => {
        if(entity.tipoArticulo === 'INSUMO'){
          this.Insumos.push(entity);
        }
      })
      
      this.Insumos.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })
  }
  loadSelectedProducts() {
    if (this.id) {
      this.maestroArticulosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
            this.selectedEntities = [...res.InsumosEntities];
            this.Insumos = this.Insumos.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      )
    }
  }

  getProductEntity(id: number) {
    this.maestroArticulosService.getById(id).subscribe((data: any)=> {
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

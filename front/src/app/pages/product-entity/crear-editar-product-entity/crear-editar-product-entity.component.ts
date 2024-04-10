import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { PedidosService } from 'src/app/services/pedidos.service';





@Component({
  selector: 'app-crear-editar-product-entity',
  templateUrl: './crear-editar-product-entity.component.html',
  styleUrls: ['./crear-editar-product-entity.component.css']
})
export class CrearEditarProductEntityComponent {
  breadcrumbItems: string = 'Crear/Editar Pedido Produccion'
  PedidoCompra: any | any;
  form: FormGroup;
  id: number;
  selectedEntities: any[] = [];
  Insumos: any[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
  };
  ProductEntityData: any;

  constructor(
    private productosEnStockService: ProductosEnStockService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,

    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      profit: ['', Validators.required],
      costo_unit: ['', Validators.required],
      uni_medida: ['', Validators.required],
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.loadAllEntities();
      for (let i = 0; i < 2; i++){
        setTimeout(() => {
          this.loadSelectedProducts();
        }, 50)
      }
      this.getProductEntity(this.id);
    }else{
      this.loadAllEntities();
    }
   
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, quantity: entity.cantidad }));
    this.presupuestoData.name = this.form.value.name;
    this.presupuestoData.description = this.form.value.description;
    this.presupuestoData.profit = this.form.value.profit;
    this.presupuestoData.costo_unit = this.form.value.costo_unit;
    this.presupuestoData.uni_medida = this.form.value.uni_medida;
    this.presupuestoData.tipoArticulo = 'PRODUCTO'
    

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
        name: 'Cajon Negro',
        description: 'Cajon Negro',
        profit: '10',
        costo_unit: '50000',
        uni_medida: 'Unidad'
        
    });
  }
  
  loadAllEntities() {
    this.maestroArticulosService.getAll().subscribe((data) => {
      data.forEach((insumo: any) => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.Insumos.push(insumo);
        }
      })
      this.Insumos.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })
  }


  loadSelectedProducts() {
    if (this.id) {
      this.maestroArticulosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.ProductosEnStocks && res.ProductosEnStocks.length > 0) {
            
            
            this.selectedEntities = res.ProductosEnStocks.map((entidad: { ProductQuantities: { quantity_necessary: any; }; }) => {
              return {
                ...entidad,
                cantidad: entidad.ProductQuantities ? entidad.ProductQuantities.quantity_necessary : 0
              };
            });
  
            this.Insumos = this.Insumos.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      );
    }
  }

  getProductEntity(id: number) {
    this.maestroArticulosService.getById(id).subscribe((data: any)=> {
      
      this.form.setValue({
        name: data.name,
        description: data.description,
        uni_medida: data.uni_medida,
        profit: data.profit,
        costo_unit: data.costo_unit,

      });
    });
}
}

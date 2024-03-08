import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { DepositosService } from 'src/app/services/depositos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';


@Component({
  selector: 'app-crear-editar-insumo',
  templateUrl: './crear-editar-insumo.component.html',
  styleUrls: ['./crear-editar-insumo.component.css']
})
export class CrearEditarInsumoComponent implements OnInit , AfterViewInit{
  breadcrumbItems: string = 'Crear/Editar Insumos'
  insumo: Insumo | any;
  listInsumos: any[] = [];
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  InsumoData: Insumo | any;
  productos: any[] = [];
  insumoCreate:any = {
    admin: 'yes',
    id: 0,
    cantidad: 0,
    depositoId: 0
  }
  depositos: any[] = [];
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private ProductosEnStockService: ProductosEnStockService,
    private maestroArticulosService: MaestroArticulosService,
    private depositosService: DepositosService,

  ) {

    if(this.aRoute.snapshot.paramMap.get('id') !== null) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      unidad_medida: ['', Validators.required],
      deposito: ['', Validators.required],
    });
  }else{
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      insumoEntity: ['', Validators.required],
      deposito: ['', Validators.required],
    });
  }
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.loadAllEntities()
      this.getInsumo(this.id);
  }else{
    this.loadAllEntities()
  }
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
 
      console.log(this.id);
    }else{

    }
  }

  addInsumo() {
    if(this.id !== 0) {
      this.insumo = {
        name: this.form.value.name,
        quantity: this.form.value.quantity,
        description: this.form.value.description,
        costo_unit: this.form.value.price,
        unidad_medida: this.form.value.unidad_medida,
        depositoId: this.form.value.deposito,
        admin: 'yes',
        type: 'INSUMO'
      }
        // Es editar
        try {
          this.ProductosEnStockService.update(this.id, this.insumo).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        this.insumoCreate = {
          cantidad: this.form.value.cantidad,
          id: this.form.value.insumoEntity,
          depositoId: this.form.value.deposito,
          admin: 'yes',
          type: 'INSUMO'
        }
        try {
          this.ProductosEnStockService.create(this.insumoCreate).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getInsumo(id: number) {
    this.ProductosEnStockService.getById(id).subscribe((data: Insumo)=> {
      this.form.setValue({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.costo_unit,
        unidad_medida: data.unidad_medida,
        deposito: data.deposito.id
      });
      console.log(data);
      
    });
  }

  loadAllEntities() {
    this.maestroArticulosService.getAll().subscribe((data) => {
      data.forEach((entity: any) => {
        if(entity.tipoArticulo === 'INSUMO'){
          this.productos.push(entity);
        }
      })
      console.log(this.productos);
    })

    this.depositosService.getAll().subscribe((data) => {
      this.depositos = data
    })
  }

}

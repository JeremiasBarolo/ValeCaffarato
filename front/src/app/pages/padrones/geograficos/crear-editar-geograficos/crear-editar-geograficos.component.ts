import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { DepositosService } from 'src/app/services/depositos.service';
import { ProductosEnStockService } from 'src/app/services/productos-en-stock.service';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-geograficos',
  templateUrl: './crear-editar-geograficos.component.html',
  styleUrls: ['./crear-editar-geograficos.component.css']
})
export class CrearEditarGeograficosComponent {
  insumo: Insumo | any;
  listPadrones: any[] = []
  form: FormGroup;
  id: string;
  id_update: number;
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
    private titleService: TitleService
  ) {
    this.id = String(aRoute.snapshot.paramMap.get('id'));
    this.id_update = Number(aRoute.snapshot.paramMap.get('id_update'));

      if(this.id === 'PAIS'){
        this.form = this.fb.group({
          pais_name: ['', Validators.required],
        })
      }else if(this.id === 'PROVINCIA'){
        this.form = this.fb.group({
          provincia_name: ['', Validators.required],
        })
      }else if(this.id === 'LOCALIDAD'){
        this.form = this.fb.group({
          localidad_name: ['', Validators.required],
          codigo_postal: ['', Validators.required]
        })
      }else{
        this.form = this.fb.group({
          banco_name: ['', Validators.required],
        })
      }
    
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.loadAllEntities()
      this.getInsumo(this.id_update);
  }else{
    this.loadAllEntities()
  }
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.titleService.setTitle(`Editar ${this.id}`);
    }else{
      this.titleService.setTitle(`Crear ${this.id}`);
    }
  }

  addInsumo() {
    if(this.id === 'PAIS'){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else if(this.id === "PROVINCIA"){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else if(this.id === "LOCALIDAD"){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else{
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
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
        deposito: data.deposito.description
      });
      console.log(data);
      
    });
  }

  loadAllEntities() {
    if(this.id === 'PAIS'){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else if(this.id === "PROVINCIA"){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else if(this.id === "LOCALIDAD"){
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }else{
      this.maestroArticulosService.getAll().subscribe((data) => {
        this.listPadrones = data
        
      })
    }
    
  }
}


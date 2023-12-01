import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-insumo',
  templateUrl: './crear-editar-insumo.component.html',
  styleUrls: ['./crear-editar-insumo.component.css']
})
export class CrearEditarInsumoComponent implements OnInit , AfterViewInit{
  
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
    cantidad: 0
  }
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private insumoService: InsumoService,
    private insumosEntityService: InsumoEntityService,
    private titleService: TitleService
  ) {

    if(this.aRoute.snapshot.paramMap.get('id') !== null) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      unidad_medida: ['', Validators.required],
    });
  }else{
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      insumoEntity: ['', Validators.required],
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
      this.titleService.setTitle('Editar Insumo');
      console.log(this.id);
    }else{
      this.titleService.setTitle('Crear Insumo');
    }
  }

  addInsumo() {
    if(this.id !== 0) {
      this.insumo = {
        name: this.form.value.name,
        quantity: this.form.value.quantity,
        description: this.form.value.description,
        price: this.form.value.price,
        unidad_medida: this.form.value.unidad_medida,
        admin: 'yes'
      }
        // Es editar
        try {
          this.insumoService.update(this.id, this.insumo).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        this.insumoCreate = {
          cantidad: this.form.value.cantidad,
          id: this.form.value.insumoEntity,
          admin: 'yes'
        }
        try {
          this.insumoService.create(this.insumoCreate).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getInsumo(id: number) {
    this.insumoService.getById(id).subscribe((data: Insumo)=> {
      this.form.setValue({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        unidad_medida: data.unidad_medida
      });
      console.log(data);
      
    });
  }

  loadAllEntities() {
    this.insumosEntityService.getAll().subscribe((data) => {
      this.productos = data
      console.log(this.productos);
    })
  }

}

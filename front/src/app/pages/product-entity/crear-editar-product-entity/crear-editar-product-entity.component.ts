import { ProductEntity } from 'src/app/models/product-entity';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TitleService } from 'src/app/services/title.service';
import { ProductEntityService } from 'src/app/services/product-entity.service';




@Component({
  selector: 'app-crear-editar-product-entity',
  templateUrl: './crear-editar-product-entity.component.html',
  styleUrls: ['./crear-editar-product-entity.component.css']
})
export class CrearEditarProductEntityComponent {
  ProductEntity: ProductEntity | any;
  listProductEntitys: Observable<ProductEntity[]> = new Observable<ProductEntity[]>();
  form: FormGroup;
  id: number;
  
  selectedImage: File | any;
  ProductEntityData: ProductEntity | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private productEntityService: ProductEntityService,
    private titleService: TitleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      measurement_depth: ['', Validators.required],
      measurement_height: ['', Validators.required],
      measurement_length: ['', Validators.required],
      profit: ['', Validators.required],
    
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.titleService.setTitle('Editar Entidad de Insumo');
      console.log(this.id);
      this.getProductEntity(this.id);
    } else{
      this.titleService.setTitle('Crear Entidad de Insumo');
      
    }   
  }

  addProductEntity() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('description', this.form.value.description);
      formData.append('measurement_depth', this.form.value.measurement_depth);
      formData.append('measurement_height', this.form.value.measurement_height);
      formData.append('measurement_length', this.form.value.measurement_length);
      formData.append('profit', this.form.value.profit);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.ProductEntity = {
        name: this.form.value.name,
        description: this.form.value.description,
        measurement_depth: this.form.value.measurement_depth,
        measurement_height: this.form.value.measurement_height,
        measurement_length: this.form.value.measurement_length,
        profit: this.form.value.profit,
      
      };

      if (this.id !== 0) {
        // Es editar
        try {
          this.productEntityService.update(this.id, this.ProductEntity).subscribe(() => {
            this.router.navigate(['dashboard/product-entity']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.productEntityService.create(this.ProductEntity).subscribe(() => {
            this.router.navigate(['dashboard/product-entity']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getProductEntity(id: number) {
    this.productEntityService.getById(id).subscribe((data: ProductEntity)=> {
      let productEntity: ProductEntity = {
        name: data.name,
        description: data.description,
        measurement_depth: data.measurement_depth,
        measurement_height: data.measurement_height,
        measurement_length: data.measurement_length,
        profit: data.profit,
        
      };
  
      this.ProductEntityData = productEntity;

      this.form.setValue({
        name: data.name,
        description: data.description,
        measurement_depth: data.measurement_depth,
        measurement_height: data.measurement_height,
        measurement_length: data.measurement_length,
        profit: data.profit
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Insumoooo',
        description: 'Super Insumo',
        measurement_depth: 12,
        measurement_height: 12,
        measurement_length: 12,
        profit: 12
        
    });
  }
}

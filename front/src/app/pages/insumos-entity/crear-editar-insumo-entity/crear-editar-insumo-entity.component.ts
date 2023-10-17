import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TitleService } from 'src/app/services/title.service';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { InsumoEntity } from 'src/app/models/insumo-entity';

@Component({
  selector: 'app-crear-editar-insumo-entity',
  templateUrl: './crear-editar-insumo-entity.component.html',
  styleUrls: ['./crear-editar-insumo-entity.component.css']
})
export class CrearEditarInsumoEntityComponent {
  insumoEntity: InsumoEntity | any;
  listInsumoEntitys: Observable<InsumoEntity[]> = new Observable<InsumoEntity[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  InsumoEntityData: InsumoEntity | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private insumoEntityService: InsumoEntityService,
    private titleService: TitleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Entidad de Insumo');
      console.log(this.id);
      this.getInsumoEntity(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Entidad de Insumo');
      
    }   
  }

  addInsumoEntity() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('quantity', this.form.value.quantity);
      formData.append('description', this.form.value.description);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.insumoEntity = {
        name: this.form.value.name,
        quantity: this.form.value.quantity,
        description: this.form.value.description,
      };

      if (this.id !== 0) {
        // Es editar
        try {
          this.insumoEntityService.update(this.id, this.insumoEntity).subscribe(() => {
            this.router.navigate(['dashboard/insumo-entity']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.insumoEntityService.create(this.insumoEntity).subscribe(() => {
            this.router.navigate(['dashboard/insumo-entity']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getInsumoEntity(id: number) {
    this.insumoEntityService.getById(id).subscribe((data: InsumoEntity)=> {
      let InsumoEntity: InsumoEntity = {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        
      };
  
      this.InsumoEntityData = InsumoEntity;

      this.form.setValue({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Insumoooo',
        description: 'Super Insumo',
        quantity: 5
        
    });
  }
}

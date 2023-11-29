import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo';
import { InsumoService } from 'src/app/services/insumo.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-crear-editar-insumo',
  templateUrl: './crear-editar-insumo.component.html',
  styleUrls: ['./crear-editar-insumo.component.css']
})
export class CrearEditarInsumoComponent {
  
  insumo: Insumo | any;
  listInsumos: Observable<Insumo[]> = new Observable<Insumo[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  InsumoData: Insumo | any;
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private insumoService: InsumoService,
    private titleService: TitleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      unidad_medida: ['', Validators.required],

    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar';
      this.titleService.setTitle('Editar Insumo');
      console.log(this.id);
      this.getInsumo(this.id);
    } else{
      this.operacion = 'Agregar';
      this.titleService.setTitle('Crear Insumo');
      
    }   
  }

  addInsumo() {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('quantity', this.form.value.quantity);
      formData.append('description', this.form.value.description);
      formData.append('price', this.form.value.price);
      formData.append('unidad_medida', this.form.value.unidad_medida);
      console.log(this.id);
      console.log(formData.forEach((value, key) => console.log(`${key}: ${value}`)));
      
      this.insumo = {
        name: this.form.value.name,
        quantity: this.form.value.quantity,
        description: this.form.value.description,
        price: this.form.value.price,
        unidad_medida: this.form.value.unidad_medida,
        admin: 'yes'
      };

      if (this.id !== 0) {
        // Es editar
        try {
          this.insumoService.update(this.id, this.insumo).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.insumoService.create(this.insumo).subscribe(() => {
            this.router.navigate(['dashboard/insumos']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getInsumo(id: number) {
    this.insumoService.getById(id).subscribe((data: Insumo)=> {
      let Insumo: any = {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        unidad_medida: data.unidad_medida
        
        
      };
  
      this.InsumoData = Insumo;

      this.form.setValue({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        unidad_medida: data.unidad_medida
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Insumoooo',
        description: 'Super Insumo',
        quantity: 5,
        price: 100,
        unidad_medida: 'Unidad'
        
    });
  }

}

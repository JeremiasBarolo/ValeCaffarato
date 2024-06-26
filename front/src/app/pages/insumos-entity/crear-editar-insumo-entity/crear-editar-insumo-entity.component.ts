import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';



@Component({
  selector: 'app-crear-editar-insumo-entity',
  templateUrl: './crear-editar-insumo-entity.component.html',
  styleUrls: ['./crear-editar-insumo-entity.component.css']
})
export class CrearEditarInsumoEntityComponent {
  insumoEntity: any | any;
  breadcrumbItems: string = 'Crear/Editar Entidad de Insumo'
  listInsumoEntitys: Observable<any[]> = new Observable<any[]>();
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  selectedImage: File | any;
  InsumoEntityData: any | any;
  unidadesMedida: any[] = [];
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArsticulosService: MaestroArticulosService,
    private unidadMedidaService: UnidadMedidaService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      costo_unit: ['', Validators.required],
      uni_medida: ['', Validators.required],
      profit: ['', Validators.required],

    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    this.unidadMedidaService.getAll().subscribe((data) => {
      this.unidadesMedida = data
    })
  
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getInsumoEntity(this.id);
    } else{
      this.operacion = 'Agregar';
      
    }   
  }

  addInsumoEntity() {
      this.insumoEntity = {
        name: this.form.value.name,
        description: this.form.value.description,
        costo_unit: this.form.value.costo_unit,
        uni_medida: this.form.value.uni_medida,
        profit: 0,
        tipoArticulo: 'INSUMO'
      };

      if (this.id !== 0) {
        // Es editar
        try {
          this.maestroArsticulosService.update(this.id, this.insumoEntity).subscribe(() => {
            this.router.navigate(['dashboard/insumo-entity']);
          });
      
        } catch (error) {
          console.log(error);
        }
      } else {
        // Es agregar
        try {
          this.maestroArsticulosService.create(this.insumoEntity).subscribe(() => {
            this.router.navigate(['dashboard/insumo-entity']);
          });
          
        } catch (error) {
          console.log(error);
        }
      }
  }
  

  getInsumoEntity(id: number) {
    this.maestroArsticulosService.getById(id).subscribe((data: any)=> {
      this.form.setValue({
        name: data.name,
        description: data.description,
        costo_unit: data.costo_unit,
        uni_medida: data.uni_medida,
        profit: data.profit,
      });
    });
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Madera',
        description: 'Madera',
        uni_medida: 'unidad',
        costo_unit: 100,
        profit: 20
        
    });
  }
}

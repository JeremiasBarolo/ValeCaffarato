import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { BancosService } from 'src/app/services/bancos.service';
import { LocalidadesService } from 'src/app/services/localidades.service';

@Component({
  selector: 'app-crear-editar-bancos',
  templateUrl: './crear-editar-bancos.component.html',
  styleUrl: './crear-editar-bancos.component.css'
})
export class CrearEditarBancosComponent {
  breadcrumbItems: string = 'Crear/Editar Bancos'
  form: FormGroup;
  productos: any[] = [];
  id: number;
  tipo: any;
  listLocalidades: any[] = [];


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private bancosService: BancosService,
    private localidadService: LocalidadesService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
      name: ['',Validators.required],
      localidad: ['',Validators.required],
    });
          
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities()
    

    if (this.id !== null) {
      this.getProduct(this.id);
    } else{
    }  
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addDeposito() {
    
    this.tipo = {
      name: this.form.value.name,
      localidad: this.form.value.localidad
    }
    
    if (this.id !== 0) {
        
      try {
        this.bancosService.update(this.id, this.tipo).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate(['dashboard/bancos']);
          this.toastr.success('Banco Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {
      this.bancosService.create(this.tipo
      ).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate(['dashboard/bancos']);
          this.toastr.success('Banco Creado Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
  }
}

  getProduct(id: number) {
    this.bancosService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        console.log(data);
        
      this.form.setValue({    
        name: data.name,
        localidad: data.localidadId
      });
    });
}
  
  loadAllEntities() {
    this.localidadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(localidad =>{
      this.listLocalidades = localidad
    }) 
  }
}

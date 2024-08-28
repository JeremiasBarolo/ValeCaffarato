import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { DepositosService } from 'src/app/services/depositos.service';

@Component({
  selector: 'app-crear-editar-depositos',
  templateUrl: './crear-editar-depositos.component.html',
  styleUrls: ['./crear-editar-depositos.component.css']
})
export class CrearEditarDepositosComponent {
  breadcrumbItems: string = 'Crear/Editar Depositos'
  PedidoCompra: Pedidos | any;
  form: FormGroup;
  productos: any[] = [];
  id: number;
  productoData: any = {
    id: 0,
    description: '',
  };
  dataCreate: any = {
    admin: 'yes'
  }
  depositos: any[] =[]

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private depositoService: DepositosService,
    private toastr: ToastrService
  ) {
    
    this.form = this.fb.group({
      description: ['', Validators.required],
    });
          
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities()
    

    if (this.id !== null) {
      
      this.getProduct(this.id);
    }  
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addDeposito() {
    this.productoData.description = this.form.value.description;       
    this.productoData.admin = 'yes';
    
    
    if (this.id !== 0) {
        
      try {
        this.depositoService.update(this.id, this.productoData).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate(['dashboard/depositos']);
          this.toastr.success('Deposito Actualizada');
        });
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {
      this.depositoService.create(this.productoData
      ).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate(['dashboard/depositos']);
          this.toastr.success('Deposito Creada Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
  }
}

  getProduct(id: number) {
    this.depositoService.getById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any)=> {
        
      this.form.setValue({  
        description: data.description
      });
    });
}
  
  loadAllEntities() {
    this.depositoService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data) => {

      this.depositos = data
    }) 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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
    } else{
    }  
  }

  addDeposito() {
    this.productoData.description = this.form.value.description;       
    this.productoData.admin = 'yes';
    
    
    if (this.id !== 0) {
        
      try {
        this.depositoService.update(this.id, this.productoData).subscribe(() => {
          this.router.navigate(['dashboard/depositos']);
          this.toastr.success('Deposito Actualizada');
        });
      } catch (error) {
        console.log(error);
      }
      
    } else {
      try {
      this.depositoService.create(this.productoData
      ).subscribe(() => {
          this.router.navigate(['dashboard/depositos']);
          this.toastr.success('Deposito Creada Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
  }
}

  getProduct(id: number) {
    this.depositoService.getById(id).subscribe((data: any)=> {
        
      this.form.setValue({  
        description: data.description
      });
    });
}
  
  loadAllEntities() {
    this.depositoService.getAll().subscribe((data) => {

      this.depositos = data
    }) 
  }
}

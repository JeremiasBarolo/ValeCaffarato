import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PedidoCompra as Pedidos } from 'src/app/models/pedidoCompra';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
import { MonedasService } from 'src/app/services/monedas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-crear-editar-pedidos-compra',
  templateUrl: './crear-editar-pedidos-compra.component.html',
  styleUrls: ['./crear-editar-pedidos-compra.component.css']
})
export class CrearEditarPedidosCompraComponent {
  breadcrumbItems: string = 'Crear/Editar Pedidos Compra'
  PedidoCompra: Pedidos | any;
  monedas: any[] = []
  form: FormGroup;
  id: number;
  personas: any[] = []
  selectedEntities: any[] = [];
  InsumosEntities: any[] = [];
  subtotal: number[] = [];
  presupuestoData: any = {
    name: '',
    description: '',
    state: 'PRESUPUESTADO',
    category: 'COMPRA',
    subtotal: 0,
    insumosEntity_id: [],
    monedaId:0
  };

  constructor(
    private maestroArticulosService: MaestroArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private monedasService: MonedasService,
    private personasServices: PersonasService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      moneda: ['', Validators.required],
      persona: ['', Validators.required]
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
    if (this.id !== null) {
      this.loadAllEntities();
      for (let i = 0; i < 2; i++){
        setTimeout(() => {
          console.log("pase aca");
          this.loadSelectedProducts();
        }, 50)
      }
      console.log(this.id);
      this.getPedido(this.id);
    }else{
      console.log("pase aca a else");
      this.loadAllEntities();
    }

    
    
  }

  addPedidoCompra() {
    this.presupuestoData.productos = this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }));
    this.presupuestoData.name = 'PEDIDO COMPRA';
    this.presupuestoData.description = 'PEDIDO COMPRA';
    this.presupuestoData.id = this.id;
    this.presupuestoData.monedaId = this.form.value.moneda;
    this.presupuestoData.personaId = this.form.value.persona;

    if (this.id !== 0) {
      try {
        this.pedidosService.update(this.id, {...this.presupuestoData, editPresupuesto: true}).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-compra']);
          this.toastr.success('Pedido Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.pedidosService.create(this.presupuestoData).subscribe(() => {
          this.router.navigate(['dashboard/pedidos-compra']);
          this.toastr.success('Pedido Creado Exitosamente');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  selectedEntity(insumoEntity: any) {
    insumoEntity.cantidad = 1;
    this.selectedEntities.push(insumoEntity);
  
    const index = this.InsumosEntities.findIndex(p => p.id === insumoEntity.id);
    if (index !== -1) {
      this.InsumosEntities.splice(index, 1);
    }
  
    localStorage.setItem('selectedEntities', JSON.stringify(this.selectedEntities));
  
  }

  
  returnEntities(Entities: any) {
    this.InsumosEntities.push(Entities);
    const index = this.selectedEntities.findIndex(p => p.id === Entities.id);
    if (index !== -1) {
      this.selectedEntities.splice(index, 1);
    }
  }

  rellenardatos() {
    this.form.setValue({
        name: 'Super pedido de Cajas',
        description: 'Cajones negros',
        moneda: 1
        
    });
  }

  loadAllEntities() {
    this.maestroArticulosService.getAll().subscribe((data) => {
      data.forEach((insumo: any) => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.InsumosEntities.push(insumo);
        }
      })
      this.InsumosEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
    })

    this.monedasService.getAll().subscribe((data)=>{
      this.monedas= data
    })

    this.personasServices.getAll().subscribe((data)=>{
      this.personas= data.filter(persona => persona.tipoPersona !== 'EMPLEADO')
      
    })
  }


  loadSelectedProducts() {
    if (this.id) {
      this.pedidosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.productos && res.productos.length > 0) {
            this.selectedEntities = res.productos.map((entidad: { PedidosProductos: { quantity_requested: any; }; }) => {
              return {
                ...entidad,
                cantidad: entidad.PedidosProductos ? entidad.PedidosProductos.quantity_requested : 0
              };
            });
  
            this.InsumosEntities = this.InsumosEntities.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
          }
        }
      );
    }
  }

  getPedido(id: number) {
    this.pedidosService.getById(id).subscribe((data: any)=> {
      
      this.form.setValue({
        moneda: data.monedaId,
        persona: data.personaId
      });
    });
  }

  
  

  
  
  
}

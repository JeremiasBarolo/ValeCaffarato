  import { AfterViewInit, Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { DepositosService } from 'src/app/services/depositos.service';
  import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';
  import { TitleService } from 'src/app/services/title.service';
import { MonedasService } from 'src/app/services/monedas.service';

@Component({
  selector: 'app-crear-editar-monedas',
  templateUrl: './crear-editar-monedas.component.html',
  styleUrls: ['./crear-editar-monedas.component.css']
})
export class CrearEditarMonedasComponent implements AfterViewInit, OnInit {
  
  moneda: any | any;
    listInsumos: any[] = [];
    form: FormGroup;
    id: number;
    operacion: string = 'Agregar ';
    InsumoData: any | any;
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
      private monedasService: MonedasService,
      private maestroArticulosService: MaestroArticulosService,
      private depositosService: DepositosService,
      private titleService: TitleService
    ) {
  
      this.form = this.fb.group({
        simbolo: ['', Validators.required],
        description: ['', Validators.required],
      });
    
      
   
      this.id = Number(aRoute.snapshot.paramMap.get('id'));
    }
  
      ngOnInit(): void {
        
        if (this.id !== null) {
          this.getMoneda(this.id);
      }
    }
  
    ngAfterViewInit(): void {
      if (this.id !== 0) {
        this.titleService.setTitle('Editar Moneda');
        console.log(this.id);
      }else{
        this.titleService.setTitle('Crear Moneda');
      }
    }
  
    addMoneda() {
      this.moneda = { 
        description: this.form.value.description,
        simbolo: this.form.value.simbolo
      }

      if(this.id !== 0) {
        
        console.log(this.moneda);
        
          // Es editar
          try {
            this.monedasService.update(this.id, this.moneda).subscribe(() => {
              this.router.navigate(['dashboard/monedas']);
            });
        
          } catch (error) {
            console.log(error);
          }
        } else {

          try {
            this.monedasService.create(this.moneda).subscribe(() => {
              this.router.navigate(['dashboard/monedas']);
            });
            
          } catch (error) {
            console.log(error);
          }
        }
    }
    
  
    getMoneda(id: number) {
      this.monedasService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          
          description: data.description,
          simbolo: data.simbolo
        });
        console.log(data);
        
      });
    }
  
}

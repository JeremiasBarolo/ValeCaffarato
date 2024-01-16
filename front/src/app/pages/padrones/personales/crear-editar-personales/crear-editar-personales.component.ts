import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { CondIvaService } from 'src/app/services/cond-iva.service';

@Component({
  selector: 'app-crear-editar-personales',
  templateUrl: './crear-editar-personales.component.html',
  styleUrls: ['./crear-editar-personales.component.css']
})
export class CrearEditarPersonalesComponent {
  any: any | any;
  listPadrones: any[] = []
  form: FormGroup;
  id: string;
  id_update: number 
  accion:string;
  operacion: string = 'Agregar ';
  anyData: any | any;
  selectedId: number | undefined
 
 
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private tipoPersonaService: TipoPersonaService,
    private condIvaService: CondIvaService,
    private titleService: TitleService
  ) {
    this.id = aRoute.snapshot.paramMap.get('id') ?? '';
    const idUpdateParam = aRoute.snapshot.paramMap.get('id_update');
    this.accion = aRoute.snapshot.paramMap.get('accion') ?? '';

    this.id_update = idUpdateParam !== null ? +idUpdateParam : 0;


    this.form = this.fb.group({
      description: ['', Validators.required],
    });
    
    
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.getPadron(this.id_update, this.accion);
    }

  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.titleService.setTitle(`Editar ${this.id}`);
    
    }else if(this.accion){
      this.titleService.setTitle(`Editar ${this.accion}`);
      
    }else{
      this.titleService.setTitle(`Crear ${this.id}`);
    }
  }

  addPadron() {
    if(this.id === 'TIPO' || this.accion === 'TIPO'){

      let tipo = {description: this.form.value.description}

      this.tipoPersonaService.create(tipo).subscribe((data) => {

        this.router.navigate(['dashboard/personales']);
        
      })
    }else{

      let cond = {description: this.form.value.description}

      this.condIvaService.create(cond).subscribe((data) => {

        this.router.navigate(['dashboard/personales']);
        
      })
    }
  }
  

  getPadron(id: number, accion:string) {
    console.log(accion);
    console.log(id);
    
    

    if(accion=== 'TIPO'){

      this.tipoPersonaService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          description: data.description
        });
      })

    }else{

      this.condIvaService.getById(id).subscribe((data: any)=> {
        this.form.setValue({
          description: data.description
        });
    });

  };   

    
  }

}

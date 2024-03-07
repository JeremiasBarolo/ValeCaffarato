import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { BancosService } from 'src/app/services/bancos.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { PaisesService } from 'src/app/services/paises.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProvinciasService } from 'src/app/services/provincias.service';



@Component({
  selector: 'app-tabla-geograficos',
  templateUrl: './tabla-geograficos.component.html',
  styleUrls: ['./tabla-geograficos.component.css']
})
export class TablaGeograficosComponent {
  form: FormGroup;
  paises: any[] = [];
  provincias: any[] = [];
  bancos: any[] = [];
  localidades: any[] = [];

  cardData: any = {
    name: ''
  }
  cardDataEliminar: any = {
    name: ''
  }
  selectedOption:string | undefined 
 
  
  constructor( 
    private personasService: PersonasService, 

    private route: ActivatedRoute,
    private router: Router,
    private paisesService: PaisesService,
    private provinciasService: ProvinciasService,
    private localidadesService: LocalidadesService,
    private bancosService: BancosService,
    private fb: FormBuilder,
    
    ) { 
      

      this.form = this.fb.group({
      accion: ['', Validators.required],
    });
    }

  ngOnInit(): void {


  this.paisesService.getAll().subscribe(pais => {
    this.paises= pais
  })

  this.bancosService.getAll().subscribe(banco => {
    this.bancos= banco
  })

  this.provinciasService.getAll().subscribe(pais => {
    this.provincias= pais
  })

  this.localidadesService.getAll().subscribe(pais => {
    this.localidades= pais
  })
}

showCardDetails(card: any) {
  this.cardData = card
  console.log(this.cardData);
}

eliminarPadron(id: number, accion: string) {
  
  const confirmacion = window.confirm('Esta acción también eliminará todos los datos enlazados a este. ¿Está seguro de querer hacerlo?');

  
  if (confirmacion) {
    if (accion === 'PAIS') {
      this.paisesService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    } else if (accion === 'PROVINCIA') {
      this.provinciasService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    } else if (accion === 'LOCALIDAD') {
      this.localidadesService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    } else {
      this.bancosService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    }
  }
}
updatePadron(id: number, accion:string) {
  this.router.navigate(['dashboard/geograficos/crear-editar', {accion: accion, id_update: id} ]);
}

  onAceptarClick() {
    this.router.navigate(['dashboard/geograficos/crear-editar', {id: this.form.value.accion} ]);
  }

  
  
}

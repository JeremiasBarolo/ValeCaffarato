import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { CondIvaService } from 'src/app/services/cond-iva.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { TitleService } from 'src/app/services/title.service';
@Component({
  selector: 'app-personales',
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.css']
})
export class PersonalesComponent {
  form: FormGroup;
  listTipoPersona: any[] = [];
  listCondIva: any[] = [];
  

  cardData: any = {
    name: ''
  }
  cardDataEliminar: any = {
    name: ''
  }
  selectedOption:string | undefined 
 
  
  constructor( 
    private tipoPersonaService: TipoPersonaService, 
    private titleService: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private condIvaService: CondIvaService,
    private fb: FormBuilder,
    
    ) { 
      

      this.form = this.fb.group({
      accion: ['', Validators.required],
    });
    }

  ngOnInit(): void {
  this.titleService.setTitle('Padrones Personales');

  this.condIvaService.getAll().subscribe(pais => {
    this.listCondIva= pais
  })

  this.tipoPersonaService.getAll().subscribe(pais => {
    this.listTipoPersona= pais
  })

  
}

showCardDetails(card: any) {
  this.cardData = card
  console.log(this.cardData);
}

eliminarPadron(id: number, accion: string) {
  
  const confirmacion = window.confirm('Este padron también se eliminará de la persona/as a las que haya sido enlazada . ¿Está seguro de querer hacerlo?');

  
  if (confirmacion) {
    if (accion === 'CONDICION') {
      this.condIvaService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    } else {
      this.tipoPersonaService.delete(id).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    
    }
  }
}
updatePadron(id: number, accion:string) {
  this.router.navigate(['dashboard/personales/crear-editar', {accion: accion, id_update: id} ]);
}

  onAceptarClick() {
    this.router.navigate(['dashboard/personales/crear-editar', {id: this.form.value.accion} ]);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPersonaService } from 'src/app/services/tipo-persona.service';
import { CondIvaService } from 'src/app/services/cond-iva.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Subject, takeUntil } from 'rxjs';

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
  private destroy$ = new Subject<void>();
 
  
  constructor( 
    private tipoPersonaService: TipoPersonaService, 

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


  this.condIvaService.getAll().pipe(takeUntil(this.destroy$)).subscribe(pais => {
    this.listCondIva= pais
  })

  this.tipoPersonaService.getAll().pipe(takeUntil(this.destroy$)).subscribe(pais => {
    this.listTipoPersona= pais
  })

  
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

showCardDetails(card: any) {
  this.cardData = card
  
}

eliminarPadron(id: number, accion: string) {
  
  const confirmacion = window.confirm('Este padron también se eliminará de la persona/as a las que haya sido enlazada . ¿Está seguro de querer hacerlo?');

  
  if (confirmacion) {
    if (accion === 'CONDICION') {
      this.condIvaService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
    } else {
      this.tipoPersonaService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
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

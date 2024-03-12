import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { Persona } from 'src/app/models/Persona';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  breadcrumbItems: string = 'Empleados'
  proveedores: any[] = [];
  persona: any;
  cardData: any = {
    name: ''
  }
  
  @ViewChild('dt')
  table!: Table; 
  filteredProveedores: any[] = [];
  
  constructor( 
    private personasService: PersonasService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.personasService.getAll().subscribe(persona => {
      persona.forEach(element => {
        if(element.Tipo_Persona.description === 'Empleado'){
          this.proveedores.push(element)
          this.filteredProveedores = this.proveedores;
        }
      }
      )
    })
      




  }

  showCardDetails(card: any) {
    
    this.cardData = card;  
    console.log('data',this.cardData);
  }

  deleteDeposito(id: any): void {
    this.personasService.delete(id).subscribe(() => {
      this.filteredProveedores = this.filteredProveedores.filter(e => e.id !== id);
      this.toastr.success('Deposito Eliminado', 'Exito');
      this.table.reset(); 
    });
}


  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredProveedores = this.proveedores.filter(proveedor => {
      return proveedor.lastname.toLowerCase().includes(value.toLowerCase());
    });
  }
}

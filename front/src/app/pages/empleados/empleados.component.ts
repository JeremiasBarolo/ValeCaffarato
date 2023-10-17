import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadosServiceService } from 'src/app/services/empleados-service.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  
  constructor( private empleadosService: EmpleadosServiceService, private titleService: TitleService) { }

  ngOnInit(): void {
  this.empleadosService.getAll().subscribe(empleados => this.empleados = empleados);
  this.titleService.setTitle('Empleados');
  }

  deleteEmpleado(id: any) {
    this.empleadosService.delete(id).subscribe(() => {
      this.empleados = this.empleados.filter(e => e.id !== id);
    });
  }
}

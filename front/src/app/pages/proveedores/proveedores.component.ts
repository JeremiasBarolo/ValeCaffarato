import { Component } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  proveedores: Proveedor[] = [];
  
  constructor( private proveedoreservice: ProveedoresService, private titleService: TitleService) { }

  ngOnInit(): void {
  this.proveedoreservice.getAll().subscribe(cliente => this.proveedores = cliente);
  this.titleService.setTitle('Proveedores');
  }

  deleteProveedor(id: any) {
    this.proveedoreservice.delete(id).subscribe(() => {
      this.proveedores = this.proveedores.filter(e => e.id !== id);
    });
  }
}

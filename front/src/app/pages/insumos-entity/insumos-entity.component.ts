import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Insumo } from 'src/app/models/insumo';
import { MaestroArticulosService } from 'src/app/services/maestro-articulos.service';


@Component({
  selector: 'app-insumos-entity',
  templateUrl: './insumos-entity.component.html',
  styleUrls: ['./insumos-entity.component.css']
})
export class InsumosEntityComponent {
  entidades: any[] = []
  filteredEntities: any[] = []
  breadcrumbItems: string = 'Insumos'
  cardData: any = {
    name: '',
    description: '',
    price: 0,
    unidad_medida: '',
  }
  constructor(
    private maestroArticulosService: MaestroArticulosService,
    private toastr: ToastrService,
    ) {
    
  }
  
  ngOnInit(): void {
    this.maestroArticulosService.getAll().subscribe(insumos => 
      insumos.forEach(insumo => {
        if(insumo.tipoArticulo === 'INSUMO'){
          this.entidades.push(insumo);
          this.filteredEntities = this.entidades
        }
      })
    )
    
    
    
  }
  deleteEntidad(id: any) {
    this.maestroArticulosService.delete(id).subscribe(() => {
      this.filteredEntities = this.filteredEntities.filter(e => e.id !== id);
      this.toastr.success('Entidad eliminada correctamente');
    
    });
  }


  showCardDetails(card: any) {
    this.cardData = card;
    
    
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredEntities = this.entidades.filter(insumo => {
      return insumo.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}

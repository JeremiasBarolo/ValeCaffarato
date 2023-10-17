import { Component } from '@angular/core';
import { InsumoEntity } from 'src/app/models/insumo-entity';
import { InsumoEntityService } from 'src/app/services/insumo-entity.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-insumos-entity',
  templateUrl: './insumos-entity.component.html',
  styleUrls: ['./insumos-entity.component.css']
})
export class InsumosEntityComponent {
  entidades: InsumoEntity[] = []
  constructor(private titleService: TitleService, private insumoEntityService: InsumoEntityService) {
    
  }
  
  ngOnInit(): void {
    this.insumoEntityService.getAll().subscribe(entidades => this.entidades = entidades);
    this.titleService.setTitle('Entidades de Insumos');
  }
  deleteEntidad(id: any) {
    this.insumoEntityService.delete(id).subscribe(() => {
      this.entidades = this.entidades.filter(e => e.id !== id);
    });
  }
}

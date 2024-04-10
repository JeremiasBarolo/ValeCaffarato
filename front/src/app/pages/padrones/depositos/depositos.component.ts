import { Component, OnInit, ViewChild } from '@angular/core';
import { DepositosService } from 'src/app/services/depositos.service';
import { Persona } from 'src/app/models/Persona';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css'],
  providers: [ConfirmationService] 
})
export class DepositosComponent implements OnInit {
  breadcrumbItems: string = 'Depositos';
  depositos: any[] = [];
  cardData: any = {
    name: ''
  };

  @ViewChild('dt')
  table!: Table; 
  filteredDepositos: any[] = [];

  constructor(
    private depositosService: DepositosService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.depositosService.getAll().subscribe(deposito => {
      this.depositos = deposito;
      this.filteredDepositos = [...this.depositos]; 
    });
  }

  showCardDetails(card: any): void {
    this.cardData = card;
    
  }

  deleteDeposito(id: any): void {
      this.depositosService.delete(id).subscribe(() => {
        this.filteredDepositos = this.filteredDepositos.filter(e => e.id !== id);
        this.toastr.success('Deposito Eliminado', 'Exito');
        this.table.reset(); 
      });
  }

  

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredDepositos = this.depositos.filter(deposito => {
      return deposito.description.toLowerCase().includes(value.toLowerCase());
    });
  }
}
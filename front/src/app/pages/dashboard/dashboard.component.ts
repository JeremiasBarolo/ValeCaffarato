import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pageTitle: string = 'Inicio';
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.pageTitle);
  }
} 



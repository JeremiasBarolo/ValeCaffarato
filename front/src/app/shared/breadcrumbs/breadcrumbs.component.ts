import { AfterViewInit, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() titulo: string | undefined 
  pageTitle: string | undefined 
  constructor() {
    
  }

  ngOnInit(): void {
    this.pageTitle = this.titulo
  }
}

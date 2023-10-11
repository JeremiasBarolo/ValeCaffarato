import { AfterViewInit, Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements AfterViewInit {
  pageTitle: string = '';
  constructor(private titleService: TitleService) {
    
  }

  ngAfterViewInit(): void {
    this.pageTitle = this.titleService.getTitle();
  }
}

import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = '';
  constructor(private titleService: TitleService) {
    
  }

  ngAfterViewInit(): void {
    this.title = this.titleService.getTitle();
  }
}

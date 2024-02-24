import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  title = ''
  @Input() titulo!: string
  receivedMessage: any = '';

  ngOnInit(): void {
    this.title = this.titulo
    console.log(this.title);
    
  }
}

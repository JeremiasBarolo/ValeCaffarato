import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private pageTitle: string = '';

  setTitle(title: string) {
    this.pageTitle = title;
  }

  getTitle() {
    return this.pageTitle;
  }
}

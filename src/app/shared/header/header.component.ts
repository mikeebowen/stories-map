import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  curUrl: string;
  isHomepage: string;

  constructor() {
    this.curUrl = window.location.pathname;
  }

  ngOnInit() {
    this.isHomepage = this.curUrl === '/' ? '15%' : '';
  }

  submitSearch() {
    alert('TO DO: Implement submitSearch function');
  }

}

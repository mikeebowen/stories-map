import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  currentUrl: string;
  isHomepage: string;

  constructor() {
    this.currentUrl = window.location.pathname;
  }

  ngOnInit() {
    this.isHomepage = this.currentUrl === '/' ? '15%' : '';
  }

  submitSearch() {
    alert('TODO: Implement submitSearch function');
  }

}

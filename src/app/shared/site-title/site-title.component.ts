import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-title',
  templateUrl: './site-title.component.html',
  styleUrls: ['./site-title.component.less']
})
export class SiteTitleComponent implements OnInit {
  siteTitle: string = 'Scary Stories';

  constructor() { }

  ngOnInit() {
  }

}

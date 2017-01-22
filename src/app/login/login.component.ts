import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  hostName: string;

  constructor() {
    this.hostName = window.location.hostname;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  private hostName: string;

  constructor() {
    this.hostName = window.location.hostname;
  }

  ngOnInit() {
  }

}

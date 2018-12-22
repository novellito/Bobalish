import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.scss']
})
export class LoginRegisterPageComponent implements OnInit {
  currentRoute: string = null;
  hide: boolean = true;

  constructor(private route: Router) {}

  ngOnInit() {
    this.currentRoute = this.route.url;
    console.log(this.currentRoute);
  }
}

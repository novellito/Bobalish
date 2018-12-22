import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.scss'],
  providers: [AuthService]
})
export class LoginRegisterPageComponent implements OnInit {
  currentRoute: string = null;
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  name = new FormControl('', [Validators.required, Validators.maxLength(15)]);

  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit() {
    this.currentRoute = this.route.url;
    console.log(this.currentRoute);
  }
  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  getNameErrorMessage() {
    return this.name.hasError('required')
      ? 'You must enter a value'
      : this.name.hasError('maxlength')
      ? 'Username must not exceed 15 characters'
      : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('minlength')
      ? 'Password must be at least 8 characters long'
      : '';
  }

  handleSubmit(form: NgForm) {
    console.log(form);
    this.auth.test();
    const { name, email, password } = form.value;
    this.auth.registerUser({ name, email, password }).subscribe(data => {
      console.log(data);
    });
    console.log(name, email, password);
  }
}

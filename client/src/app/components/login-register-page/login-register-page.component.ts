import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.scss'],
  providers: [AuthService]
})
export class LoginRegisterPageComponent implements OnInit {
  currentRoute: string = null;
  hide: boolean = true;
  invalidCreds: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  name = new FormControl('', [Validators.required, Validators.maxLength(15)]);

  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decode(token);
      if (decodedToken) {
        // redirect user back home if they try to access
        // these routes while already logged in
        this.auth.isLoggedIn = true;
        this.route.navigate(['/home']);
      }
    } catch (err) {
      console.log(err);
    }

    this.currentRoute = this.route.url;
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
    if (this.currentRoute === '/register') {
      this.auth
        .createUser({
          name: this.name.value,
          email: this.email.value,
          password: this.password.value
        })
        .subscribe(({ data: { createUser: user } }) => {
          //store token to localstorage and redirect to home
          localStorage.setItem('token', user.token);
          this.route.navigate(['/home']);
        });
    } else {
      const { email, password } = form.value;
      this.auth.loginUser({ email, password }).subscribe(
        ({ data: { login: user } }) => {
          if (user.token) {
            localStorage.setItem('token', user.token);
            this.route.navigate(['/home']);
          } else {
          }
        },
        err => {
          this.invalidCreds = true;
        }
      );
    }
  }
}

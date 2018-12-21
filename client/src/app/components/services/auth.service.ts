import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanB3MWtkMHUwMDA2MGI2MnpxdWZmeW5yIiwiaWF0IjoxNTQ1Mjc2MjIzLCJleHAiOjE1NDU4ODEwMjN9.fPvIsLV-qspdQlr67dVf0-thVPJexqKqYafoRFrkLrA';
  constructor() {}
}

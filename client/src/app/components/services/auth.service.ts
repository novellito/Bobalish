import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createUser, login } from './Mutations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private apollo: Apollo) {}

  createUser({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        data: {
          name,
          email,
          password
        }
      }
    });
  }
  loginUser({ email, password }: { email: string; password: string }) {
    return this.apollo.mutate({
      mutation: login,
      variables: {
        data: {
          email,
          password
        }
      }
    });
  }
}

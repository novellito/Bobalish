import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanB3MWtkMHUwMDA2MGI2MnpxdWZmeW5yIiwiaWF0IjoxNTQ1Mjc2MjIzLCJleHAiOjE1NDU4ODEwMjN9.fPvIsLV-qspdQlr67dVf0-thVPJexqKqYafoRFrkLrA';
  constructor(private apollo: Apollo) {}

  test() {
    console.log('hi');
  }
  registerUser({
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
}

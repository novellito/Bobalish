import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, Query } from './types';

const query = gql`
  {
    users {
      name
      password
      id
    }
  }
`;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  data: Observable<User[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.data = this.apollo
      .watchQuery<Query>({
        query: query
      })
      .valueChanges.pipe(
        map(({ data }) => {
          console.log(data);
          return data.users;
        })
      );
  }
}

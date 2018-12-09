import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, Query, Drink } from './types';
import { ListManagerService } from '../services/list-manager.service';
import { NgForm } from '@angular/forms';

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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Observable<User[]>;
  drinks: Drink[] = [];
  constructor(
    private apollo: Apollo,
    private listManager: ListManagerService
  ) {}

  ngOnInit() {
    this.drinks = this.listManager.drinks;
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

  handleSubmit(form: NgForm) {
    const { name, from, price } = form.value;
    this.listManager.addItem({ name, from, price });
    // reset the errors of all the controls
    form.reset();
  }
}

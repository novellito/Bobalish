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
    drinks {
      name
      from
      price
    }
  }
`;
// const query = gql`
//   {
//     users {
//       name
//       password
//       id
//       drinks {
//         name
//         from
//         price
//       }
//     }
//   }
// `;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Observable<any[]>;
  drinks: Drink[] = [];
  constructor(
    private apollo: Apollo,
    private listManager: ListManagerService
  ) {}

  ngOnInit() {
    // this.drinks = this.listManager.drinks;
    // // this.listManager.drinks = this.apollo
    // this.data = this.apollo
    //   .watchQuery<Query>({
    //     query: query
    //   })
    //   .valueChanges.pipe(
    //     map(({ data }) => {
    //       console.log(data);
    //       // // console.log(data.users[0].drinks);
    //       // this.listManager.drinks = data.users[0].drinks;
    //       this.listManager.drinks = data.drinks;
    //       this.listManager.data.filter = '';
    //       console.log(this.listManager.drinks);
    //       console.log(data.drinks);
    //       return data.drinks;
    //       // return data.users;
    //     })
    //   );
    // console.log('wowser', this.data);
  }

  handleSubmit(form: NgForm) {
    const { name, from, price } = form.value;
    if (this.listManager.editing) {
      this.listManager
        .updateInServer({ name, from, price })
        .subscribe(({ data: { updateDrink: drink } }) => {
          console.log(drink);
          this.listManager.createDrink({
            id: drink.id,
            name: drink.name,
            from: drink.from,
            price: drink.price
          });
        });
    } else {
      this.listManager
        .createInServer({ name, from, price })
        .subscribe(({ data: { createDrink: drink } }) => {
          this.listManager.createDrink({
            id: drink.id,
            name: drink.name,
            from: drink.from,
            price: drink.price
          });
        });
      // reset the errors of all the controls
    }
    form.reset();
  }
}

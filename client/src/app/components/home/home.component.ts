import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query, Drink } from './types';
import { ListManagerService } from '../services/list-manager.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
const getProfile = gql`
  {
    me {
      id
      name
      email
      drinks {
        name
        from
        price
        id
      }
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  drinks: Drink[] = null;

  setPosition;
  constructor(
    private route: Router,
    private apollo: Apollo,
    private auth: AuthService,
    private listManager: ListManagerService
  ) {}

  ngOnInit() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log('lat ', position.coords.latitude);
    //     console.log('long', position.coords.longitude);
    //   });
    // } else {
    //   console.log('err');
    // }

    // check if valid token and set logged in status accordingly
    this.apollo
      .watchQuery<Query>({
        query: getProfile
      })
      .valueChanges.subscribe(({ data: { me: body } }) => {
        if (body) {
          this.drinks = body.drinks;
          this.auth.isLoggedIn = true;
        } else {
          this.route.navigate(['/login']);
        }
      });
  }

  // Either update the drink or create a new one
  handleSubmit(form: NgForm) {
    const { name, from, price } = form.value;
    if (this.listManager.editing) {
      this.listManager
        .updateInServer({ name, from, price })
        .subscribe(({ data: { updateDrink: drink } }) => {
          this.listManager.modifyDrink({
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
          this.listManager.modifyDrink({
            id: drink.id,
            name: drink.name,
            from: drink.from,
            price: drink.price
          });
        });
    }
    form.reset();
  }

  // Logout user & clear token
  logout() {
    localStorage.removeItem('token');
    this.auth.isLoggedIn = false;
    this.route.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { Drink } from '../../components/home/types';
import { MatTableDataSource } from '@angular/material';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
const createDrink = gql`
  mutation($data: CreateDrinkInput!) {
    createDrink(data: $data) {
      id
      name
      from
      price
      creator {
        name
        email
        drinks {
          name
          from
          price
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  drinks: Drink[] = [];
  data = new MatTableDataSource<Drink>(this.drinks);
  drinkToEdit: Drink = { name: '', from: '', price: null };
  editing: Boolean = false;
  editIndex: number = null;

  constructor(private apollo: Apollo) {}

  // Method to handle adding/ updating drinks
  addItem({ name, from, price }: Drink) {
    // Set the drink & reset the trackers
    if (this.editing) {
      this.drinks[this.editIndex] = { name, from, price };
      this.data = new MatTableDataSource<Drink>(this.drinks);
      this.editIndex = null;
      this.editing = false;
    } else {
      // add the new drink to the data source
      this.drinks = [...this.drinks, { name, from, price }];
      this.data = new MatTableDataSource<Drink>(this.drinks);
    }
  }

  createDrink({ name, from, price }: Drink) {
    return this.apollo.mutate({
      mutation: createDrink,
      variables: {
        data: {
          name,
          from,
          price
        }
      }
    });
  }

  deleteItem(index: number) {
    this.drinks = this.drinks.filter(elem => elem !== this.drinks[index]);
    this.data = new MatTableDataSource<Drink>(this.drinks);
  }

  // When item is being edited - retrive the item
  // set the index and flip the boolean flag
  editItem(index: number) {
    this.drinkToEdit = this.drinks[index];
    this.editIndex = index;
    this.editing = true;
  }
}

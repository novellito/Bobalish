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

const deleteDrink = gql`
  mutation($id: ID!) {
    deleteDrink(id: $id) {
      id
      name
      from
      price
    }
  }
`;
const updateDrink = gql`
  mutation($data: UpdateDrinkInput!) {
    updateDrink(data: $data) {
      id
      name
      from
      price
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  drinks: Drink[] = [];
  data = new MatTableDataSource<Drink>(this.drinks);
  drinkToEdit: Drink = { name: '', from: '', price: null, id: '' };
  editing: Boolean = false;
  editIndex: number = null;

  constructor(private apollo: Apollo) {}

  // Method to handle adding/ updating drinks
  modifyDrink({ id, name, from, price }: Drink) {
    // Set the drink & reset the trackers
    if (this.editing) {
      this.drinks[this.editIndex] = { id, name, from, price };
      this.data = new MatTableDataSource<Drink>(this.drinks);
      this.editIndex = null;
      this.editing = false;
    } else {
      // add the new drink to the data source
      this.drinks = [...this.drinks, { id, name, from, price }];
      this.data = new MatTableDataSource<Drink>(this.drinks);
    }
  }

  createInServer({
    name,
    from,
    price
  }: {
    name: string;
    from: string;
    price: number;
  }) {
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

  deleteDrink(id: string) {
    this.drinks = this.drinks.filter(elem => elem.id !== id);
    this.data = new MatTableDataSource<Drink>(this.drinks);
  }

  deleteFromServer(id: string) {
    return this.apollo.mutate({
      mutation: deleteDrink,
      variables: { id }
    });
  }

  updateInServer({
    name,
    from,
    price
  }: {
    name: string;
    from: string;
    price: number;
  }) {
    return this.apollo.mutate({
      mutation: updateDrink,
      variables: {
        data: {
          id: this.drinkToEdit.id,
          name,
          from,
          price
        }
      }
    });
  }

  // When item is being edited - retrive the item
  // set the index and flip the boolean flag to true
  editItem(index: number) {
    this.drinkToEdit = this.drinks[index];
    this.editIndex = index;
    this.editing = true;
  }
}

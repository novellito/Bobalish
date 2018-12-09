import { Injectable } from '@angular/core';
import { Drink } from '../../components/home/types';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  drinks: Drink[] = [{ name: 'trap', from: 'boolean', price: 333 }];

  // drinks: Drink[] = [];
  data = new MatTableDataSource<Drink>(this.drinks);
  drinkToEdit: Drink = { name: '', from: '', price: null };
  editing: Boolean = false;
  editIndex: number = null;

  constructor() {}

  // Method to handle adding/ updating drinks
  addItem({ name, from, price }: any) {
    // Set the drink & reset the trackers
    if (this.editing) {
      this.drinks[this.editIndex] = { name, from, price };
      this.editIndex = null;
      this.editing = false;
    } else {
      this.drinks.push({ name, from, price });
    }
    this.data.filter = ''; // Used to update the table
  }

  deleteItem(index: number) {
    this.drinks.splice(index, 1);
    this.data.filter = '';
  }

  // When item is being edited - retrive the item
  // set the index and flip the boolean flag
  editItem(index: number) {
    this.drinkToEdit = this.drinks[index];
    this.editIndex = index;
    this.editing = true;
    console.log(this.drinkToEdit);
  }
}

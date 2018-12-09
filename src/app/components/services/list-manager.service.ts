import { Injectable } from '@angular/core';
import { Drink } from '../../components/home/types';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  drinks: Drink[] = [];
  data = new MatTableDataSource<Drink>(this.drinks);
  drinkToEdit: Drink = { name: '', from: '', price: null };
  editing: Boolean = false;
  editIndex: number = null;

  constructor() {}

  addItem({ name, from, price }: any) {
    if (this.editing) {
      this.drinks[this.editIndex] = { name, from, price };
      this.editIndex = null;
      this.editing = false;
      // reset edit index
    } else {
      this.drinks.push({ name, from, price });
    }
    this.data.filter = '';
    console.log(this.drinks);
  }

  deleteItem(index: number) {
    this.drinks.splice(index, 1);
    this.data.filter = '';
  }

  editItem(index: number) {
    this.drinkToEdit = this.drinks[index];
    this.editIndex = index;
    this.editing = true;
    console.log(index);
  }
}

import { Injectable } from '@angular/core';
import { Drink } from '../../components/home/types';
@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  drinks: Drink[] = [];

  constructor() {}

  addItem({ name, from, price }: any) {
    this.drinks.push({ name, from, price });
  }
}

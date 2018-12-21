import { Component, OnInit } from '@angular/core';
import { ListManagerService } from '../services/list-manager.service';
import { Apollo } from 'apollo-angular';
import { User, Query, Drink } from '../home/types';
import gql from 'graphql-tag';
import { MatTableDataSource } from '@angular/material';
const query = gql`
  {
    drinks {
      id
      name
      from
      price
    }
  }
`;
@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {
  // old example of passing data
  // @Input() drinks: any = this.listManager.data;

  displayedColumns: string[] = ['name', 'from', 'price', 'actions'];

  constructor(
    private listManager: ListManagerService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.apollo
      .watchQuery<Query>({
        query: query
      })
      .valueChanges.subscribe(({ data }) => {
        console.log(data);
        this.listManager.data = new MatTableDataSource(data.drinks); // Add to datasource for table
        this.listManager.drinks = data.drinks;
        return data.drinks;
      });
  }

  edit(id: string) {
    console.log(id);
    this.listManager.editing = true;
  }
  delete(id: string) {
    this.listManager.deleteFromServer(id).subscribe(({ data }) => {
      this.listManager.deleteDrink(id);
    });
  }
}

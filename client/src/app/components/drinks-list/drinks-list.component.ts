import { Component, OnInit } from '@angular/core';
import { ListManagerService } from '../services/list-manager.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { User, Query, Drink } from '../home/types';
import gql from 'graphql-tag';
import { MatTableDataSource } from '@angular/material';
const query = gql`
  {
    drinks {
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
  // providers: [ListManagerService]
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
        // this.listManager.data = data.drinks; // Add to datasource for table
        this.listManager.data = new MatTableDataSource(data.drinks); // Add to datasource for table
        this.listManager.drinks = data.drinks;
        // console.log(this.listManager.data);
        return data.drinks;
        // return data.users;
      });
  }
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ListManagerService } from '../services/list-manager.service';
import { Drink } from '../home/types';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {
  @Input() drinks: Drink[] = null; // to receive from parent (home) component
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'from', 'price', 'actions'];

  constructor(private listManager: ListManagerService) {}

  ngOnInit() {
    this.listManager.data = new MatTableDataSource(this.drinks); // Add to datasource for table
    this.listManager.data.paginator = this.paginator;
    this.listManager.drinks = this.drinks;
  }

  delete(id: string) {
    this.listManager.deleteFromServer(id).subscribe(({ data }) => {
      this.listManager.deleteDrink(id);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ListManagerService } from '../services/list-manager.service';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {
  // old example of passing data
  // @Input() drinks: any = this.listManager.data;

  datasource = this.listManager.data;

  // dataSource = new MatTableDataSource(this.drinks);
  displayedColumns: string[] = ['name', 'from', 'price', 'actions'];

  constructor(private listManager: ListManagerService) {}

  ngOnInit() {}

  edit(index: number) {
    console.log(index);
  }
  delete(index: number) {
    this.listManager.drinks.splice(index, 1);
    console.log(this.listManager.drinks);
  }
}

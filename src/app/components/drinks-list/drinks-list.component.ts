import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {
  @Input() drinks: any = null;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'apollo-client/util/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  rates: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.rates = this.apollo
      .watchQuery<any>({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        this.rates = result.data.rates;
        // this.rates = result.data && result.data.rates;
        this.loading = result.loading;
        // this.error = result.error;
      });
  }
}

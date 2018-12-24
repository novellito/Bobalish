import { Component, OnInit, Input } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Location } from '../home/types';
import { MatTableDataSource } from '@angular/material';
const recommendations = gql`
  query($data: Coordinates!) {
    locations(data: $data) {
      name
      distance
      url
      rating
      review_count
    }
  }
`;
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  @Input() coordinates: { latitude: number; longitude: number } = null;
  recommendations: Location[] = [];
  recommendationsData = new MatTableDataSource(this.recommendations);
  isLoading: boolean = true;
  displayedColumns = ['name', 'distance', 'rating', 'review count'];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    if (this.coordinates.latitude && this.coordinates.longitude) {
      this.apollo
        .watchQuery<any>({
          query: recommendations,
          variables: {
            data: {
              latitude: this.coordinates.latitude,
              longitude: this.coordinates.longitude
            }
          }
        })
        .valueChanges.subscribe(({ data: { locations: places } }) => {
          this.isLoading = false;
          this.recommendationsData = new MatTableDataSource(places);
        });
    }
  }
}

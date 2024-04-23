import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  starArray: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.calculateStars();
    }
  }

  private calculateStars(): void {
    const roundedRating = Math.round(this.rating);
    this.starArray = Array.from({ length: 5 }, (_, index) => index < roundedRating ? 1 : 0);
  }
}

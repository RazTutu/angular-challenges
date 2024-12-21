import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      [delete]="delete"
      [addNewItem]="addNewItem"
      customClass="bg-light-green">
      <card-image>
        <img src="assets/img/student.webp" width="200px" />
      </card-image>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  constructor(
    private http: FakeHttpService,
    public store: CityStore,
  ) {
    this.delete = this.delete.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => {
      return (this.cities = c);
    });
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}

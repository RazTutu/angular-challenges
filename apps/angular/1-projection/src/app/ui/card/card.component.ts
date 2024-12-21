import { NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="card-image"></ng-content>

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName || item.name"
          [id]="item.id"
          [type]="type"
          [delete]="delete"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgIf, NgFor, ListItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() delete!: (id: number) => void;
  @Input() addNewItem!: () => void;

  CardType = CardType;
}

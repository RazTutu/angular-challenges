import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [type]="cardType"
      [store]="store"
      [addNewItem]="addNewItem"
      [delete]="delete"
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
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    public store: StudentStore,
  ) {
    this.delete = this.delete.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }
}

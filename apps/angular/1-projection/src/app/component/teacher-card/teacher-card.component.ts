import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [type]="cardType"
      [store]="store"
      [delete]="delete"
      [addNewItem]="addNewItem"
      customClass="bg-light-red">
      <card-image>
        <img src="assets/img/teacher.png" width="200px" />
      </card-image>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  providers: [TeacherStore],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    public store: TeacherStore,
  ) {
    this.delete = this.delete.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}

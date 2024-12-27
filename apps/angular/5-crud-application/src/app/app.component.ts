import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { TodoService } from './todo.service';

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  body: string;
}

@Component({
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="loading"></mat-spinner>
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: WritableSignal<ToDo[]> = signal([]);
  loading = false;

  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.toDoService.getTodos().subscribe(
      (todos) => {
        this.todos.set(todos);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching todos:', error);
        this.loading = false;
      },
    );
  }

  update(todo: ToDo) {
    this.loading = true;
    const updatedTodo = { ...todo, title: randText() };
    this.toDoService.updateTodo(updatedTodo).subscribe(
      (updated) => {
        this.todos.update((currentTodos) =>
          currentTodos.map((t) => (t.id === updated.id ? updated : t)),
        );
        this.loading = false;
      },
      (error) => {
        console.error('Error updating todo:', error);
        this.loading = false;
      },
    );
  }

  delete(todo: ToDo) {
    this.loading = true;
    this.toDoService.delete(todo).subscribe(
      () => {
        this.todos.update((currentTodos) =>
          currentTodos.filter((t) => t.id !== todo.id),
        );
        this.loading = false;
      },
      (error) => {
        console.error('Error deleting todo:', error);
        this.loading = false;
      },
    );
  }
}

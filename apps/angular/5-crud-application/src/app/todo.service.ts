import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToDo } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ToDo[]> {
    return this.http
      .get<ToDo[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.http
      .put<ToDo>(
        `${this.apiUrl}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: todo.title,
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(catchError(this.handleError));
  }

  delete(todo: ToDo): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${todo.id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

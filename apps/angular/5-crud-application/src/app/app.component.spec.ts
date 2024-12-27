import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { render, screen } from '@testing-library/angular';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';

describe('AppComponent', () => {
  let todoService: jest.Mocked<TodoService>;

  beforeEach(async () => {
    todoService = {
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TodoService>;

    await render(AppComponent, {
      imports: [CommonModule, MatProgressSpinnerModule],
      providers: [{ provide: TodoService, useValue: todoService }],
    });
  });

  it('should display loading spinner while fetching todos', async () => {
    todoService.getTodos.mockReturnValue(of([]));
    await render(AppComponent, {
      imports: [CommonModule, MatProgressSpinnerModule],
      providers: [{ provide: TodoService, useValue: todoService }],
    });
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should handle error when fetching todos', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    todoService.getTodos.mockReturnValue(throwError('Error fetching todos'));
    await render(AppComponent, {
      imports: [CommonModule, MatProgressSpinnerModule],
      providers: [{ provide: TodoService, useValue: todoService }],
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching todos:',
      'Error fetching todos',
    );
  });
});

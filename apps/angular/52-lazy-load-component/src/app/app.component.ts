import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(trigger)) {
        <app-top />
      } @placeholder {
        <div>
          <app-placeholder />
          <button
            #trigger
            class="rounded-sm border border-blue-500 bg-blue-300 p-2">
            Load Top
          </button>
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule, PlaceholderComponent, TopComponent],
})
export class AppComponent {}

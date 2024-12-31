import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
}).catch((err) => console.error(err));

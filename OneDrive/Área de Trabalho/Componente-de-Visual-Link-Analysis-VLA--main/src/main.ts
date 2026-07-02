import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './via-viewer/app.config';
import { App } from './via-viewer/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// // import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { enableProdMode } from '@angular/core';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
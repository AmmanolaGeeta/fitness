import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { CalorieService } from './service/calorie.service';
import { FirebaseService } from './service/firebase.service';
import { StepService } from './service/step.service';
import { ThemeService } from './service/theme.service';
import { WaterService } from './service/water.service';
// import { appConfig } from './app.config'; // Import the configuration


@NgModule({
  declarations: [],  //AppComponent
  imports: [BrowserModule, IonicModule.forRoot({
    // mode: appConfig.appName === 'Fitness Tracker' ? 'ios' : 'md', // Example usage
  }), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule],
  providers: [     AngularFirestore,
    { provide: 'firebaseConfig', useValue: environment.firebaseConfig }, // Provide the configuration
    // { provide: 'appConfig', useValue: environment.appConfig }, // Provide the configuration
    FirebaseService, AuthService ,CalorieService,StepService,ThemeService,WaterService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

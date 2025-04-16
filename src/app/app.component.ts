import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ThemeService } from './service/theme.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // standalone: true,
  imports: [IonicModule ,ReactiveFormsModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    
    // Set status bar style based on theme
    if (this.themeService.isDarkMode()) {
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      StatusBar.setStyle({ style: Style.Light });
    }
    
    // Hide splash screen
    SplashScreen.hide();
    
    // Set app to full screen on Android
    if (this.platform.is('android')) {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }
}
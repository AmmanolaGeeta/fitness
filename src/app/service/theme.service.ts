import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.darkMode = (await this.storage.get('darkMode')) || false;
    this.setTheme(this.darkMode);
  }

  async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    await this.storage.set('darkMode', this.darkMode);
    this.setTheme(this.darkMode);
  }

  private setTheme(dark: boolean) {
    document.body.classList.toggle('dark', dark);
    
    // Set status bar style
    if (dark) {
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      StatusBar.setStyle({ style: Style.Light });
    }
  }

  isDarkMode() {
    return this.darkMode;
  }
}
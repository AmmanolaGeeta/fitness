import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ThemeService } from '../service/theme.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule ,ReactiveFormsModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit {
  user: any = null;
  darkMode = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    this.darkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.themeService.toggleDarkMode();
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Account',
      message: 'This action cannot be undone. All your data will be permanently deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.authService.deleteAccount();
              this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error deleting account:', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
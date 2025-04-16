import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html', 
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule], // Add CommonModule here
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class TabsPage {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.logout();
  }
}
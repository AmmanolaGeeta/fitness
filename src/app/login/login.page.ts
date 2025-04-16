import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from  './../service/auth.service';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule ,ReactiveFormsModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });
    await loading.present();

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      await loading.dismiss();
      this.router.navigate(['/tabs']);
    } catch (error) {
      await loading.dismiss();
    }
  }

  async googleLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in with Google...'
    });
    await loading.present();

    try {
      await this.authService.googleSignIn();
      await loading.dismiss();
      this.router.navigate(['/tabs']);
    } catch (error) {
      await loading.dismiss();
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
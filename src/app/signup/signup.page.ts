import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule ,ReactiveFormsModule ,CommonModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async signup() {
    const loading = await this.loadingCtrl.create({
      message: 'Creating account...'
    });
    await loading.present();

    try {
      await this.authService.signup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.name
      );
      await loading.dismiss();
      this.router.navigate(['/login']);
    } catch (error) {
      await loading.dismiss();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

// import { Component, inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { IonicModule } from '@ionic/angular/standalone';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule]
// })
// export class SignupPage {
//   private authService = inject(AuthService);
//   private fb = inject(FormBuilder);
  
//   signupForm: FormGroup;

//   constructor() {
//     this.signupForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       name: ['', Validators.required]
//     });
//   }

//   async signup() {
//     if (this.signupForm.valid) {
//       const { email, password, name } = this.signupForm.value;
//       try {
//         await this.authService.signup(email, password, name);
//       } catch (error) {
//         console.error('Signup failed:', error);
//       }
//     }
//   }
// }
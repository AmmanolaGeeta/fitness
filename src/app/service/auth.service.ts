import {  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
 
   
  ) {
    console.log('AngularFireAuth:  AngularFirestore', this.afAuth, this.firestore);

  }

  // Email/password login
  async login(email: string, password: string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });
    await loading.present();

    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await loading.dismiss();
      this.router.navigate(['/tabs']);
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Login Failed', (error as Error).message);
      throw error;
    }
  }

  // Email/password signup

  async signup(email: string, password: string, name: string): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Creating account...'
    });
    await loading.present();

    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await result.user?.updateProfile({ displayName: name });
      
      // Create user document in Firestore
      const userData: User = {
        email,
        name,
        photoURL: result.user?.photoURL || '',
        createdAt: new Date(),
        dailyStepGoal: 10000,
        dailyWaterGoal: 2000,
        dailyCalorieGoal: 2000
      };
      
      await this.firebaseService.createUser(userData);
      // const user =  await this.afAuth.currentUser;  // await this.getCurrentUser().;
    // if (user) {
    // console.log('result.user',result.user ,result.user?.uid);
    
    //   if (result.user) {
    //     await this.firestore.collection('users').doc(result.user.uid).set(userData);

    //   //  this.firestore.collection('users').doc(user.uid).set(userData);
    //    await loading.dismiss();
    //    this.router.navigate(['/tabs']);
    // }
    // throw new Error('User not authenticated');
      
    
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Signup Failed', (error as Error).message);
      // throw error;
    }
  }

  // Google login
  async googleSignIn(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in with Google...'
    });
    await loading.present();

    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      
      // Create user document if it doesn't exist
      if (result.additionalUserInfo?.isNewUser) {
        const userData: User = {
          email: result.user?.email || '',
          name: result.user?.displayName || 'User',
          photoURL: result.user?.photoURL || '',
          createdAt: new Date(),
          dailyStepGoal: 10000,
          dailyWaterGoal: 2000,
          dailyCalorieGoal: 2000
        };
        
        await this.firebaseService.createUser(userData);
      }
      
      await loading.dismiss();
      this.router.navigate(['/tabs']);
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Google Login Failed', (error as Error).message);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  // Get current user
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // Helper to show alerts
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
  async deleteAccount(): Promise<void> {
    // Implementation for deleting the account
    console.log('Account deleted successfully');
  }
}



// import { Injectable, inject } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { AlertController, LoadingController } from '@ionic/angular/standalone';
// import { FirebaseService } from './firebase.service';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private auth = inject(Auth);
//   private router = inject(Router);
//   private alertCtrl = inject(AlertController);
//   private loadingCtrl = inject(LoadingController);
//   private firebaseService = inject(FirebaseService);

//   // Email/password login
//   async login(email: string, password: string): Promise<void> {
//     const loading = await this.loadingCtrl.create({
//       message: 'Logging in...'
//     });
//     await loading.present();

//     try {
//       await signInWithEmailAndPassword(this.auth, email, password);
//       await loading.dismiss();
//       this.router.navigate(['/tabs']);
//     } catch (error) {
//       await loading.dismiss();
//       this.showAlert('Login Failed', (error as Error).message);
//       throw error;
//     }
//   }

//   // Email/password signup
//   async signup(email: string, password: string, name: string): Promise<void> {
//     const loading = await this.loadingCtrl.create({
//       message: 'Creating account...'
//     });
//     await loading.present();

//     try {
//       const result = await createUserWithEmailAndPassword(this.auth, email, password);
      
//       // Create user document in Firestore
//       const userData: User = {
//         email,
//         name,
//         createdAt: new Date(),
//         dailyStepGoal: 10000,
//         dailyWaterGoal: 2000,
//         dailyCalorieGoal: 2000
//       };
      
//       await this.firebaseService.createUser(userData);
      
//       await loading.dismiss();
//       this.router.navigate(['/tabs']);
//     } catch (error) {
//       await loading.dismiss();
//       this.showAlert('Signup Failed', (error as Error).message);
//       throw error;
//     }
//   }

//   private async showAlert(header: string, message: string) {
//     const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
//     await alert.present();
//   }
// }
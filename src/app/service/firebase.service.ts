import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from   './../models/user.model'; 
// import { Firestore } from '@angular/fire/firestore';
import { StepData, WaterData, CalorieData } from './../models/fitness-data.model';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
// import { doc, Firestore, setDoc ,collection} from '@angular/fire/firestore';
import type { CollectionReference, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // private _firestore: Firestore = inject(Firestore);
  // private  _injector: EnvironmentInjector = inject(EnvironmentInjector);

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
    
  ) {}

  // Get current user ID
  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return of(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  // User Operations
  // async createUser(userData: User) {
  //   const user = await this.auth.currentUser;
  //   if (user) {

  //     //  runInInjectionContext(this._injector, async () => {
  //     //   const collectionRef: CollectionReference = collection(this._firestore, 'users'); // your collection name
  //     //   return await addDoc(collectionRef, userData);
  //     // });
  //     return runInInjectionContext(this._injector, async () => {
  //       const userDocRef = doc(this._firestore, `users/${user.uid}`);
  //       await setDoc(userDocRef, userData);
  //     });
  //   }
  //   throw new Error('User not authenticated');
  // }

  async createUser(userData: User): Promise<void> {
    const user = await this.auth.currentUser;
    if (user) {
      // const injector = inject(EnvironmentInjector);
      // runInInjectionContext(injector, () => {
      //   const firestore = inject(Firestore);
      //   const userDocRef = doc(firestore, 'users', user.uid);
      //   return setDoc(userDocRef, user);
      // });

      
      const userDocRef = this.firestore.collection('users').doc(user.uid);
      await userDocRef.set(userData);

      // const userDocRef = await this.firestore.collection('users').doc(user.uid).set(userData);
      // await userDocRef.set(userData);
    } else {
      throw new Error('User not authenticated');
    }
  }

  getUserData(userId: string): Observable<User | undefined> {
    return this.firestore.collection('users').doc<User>(userId).valueChanges();
  }

  updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(data);
  }

  // Step Data Operations
  getTodayStepData(userId: string): Observable<StepData | undefined> {
    const today = this.getCurrentDateString();
    return this.firestore.collection<StepData>('steps')
      .doc(`${userId}_${today}`)
      .valueChanges();
  }

  updateStepData(userId: string, data: Partial<StepData>): Promise<void> {
    const today = this.getCurrentDateString();
    return this.firestore.collection('steps')
      .doc(`${userId}_${today}`)
      .set({
        userId,
        date: today,
        ...data,
        updatedAt: new Date()
      }, { merge: true });
  }

  // Water Data Operations
  getTodayWaterData(userId: string): Observable<WaterData | undefined> {
    const today = this.getCurrentDateString();
    return this.firestore.collection<WaterData>('water')
      .doc(`${userId}_${today}`)
      .valueChanges();
  }

  updateWaterData(userId: string, data: Partial<WaterData>): Promise<void> {
    const today = this.getCurrentDateString();
    return this.firestore.collection('water')
      .doc(`${userId}_${today}`)
      .set({
        userId,
        date: today,
        ...data,
        updatedAt: new Date()
      }, { merge: true });
  }

  // Calorie Data Operations
  getTodayCalorieData(userId: string): Observable<CalorieData | undefined> {
    const today = this.getCurrentDateString();
    return this.firestore.collection<CalorieData>('calories')
      .doc(`${userId}_${today}`)
      .valueChanges();
  }

  updateCalorieData(userId: string, data: Partial<CalorieData>): Promise<void> {
    const today = this.getCurrentDateString();
    return this.firestore.collection('calories')
      .doc(`${userId}_${today}`)
      .set({
        userId,
        date: today,
        ...data,
        updatedAt: new Date()
      }, { merge: true });
  }

  // Helper function
  private getCurrentDateString(): string {
    return new Date().toISOString().split('T')[0];
  }
}

// Removed redefined `collection` functions to avoid conflicts with Firestore API.

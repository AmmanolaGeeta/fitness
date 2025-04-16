import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AlertController } from '@ionic/angular';
import { CalorieData } from '../models/fitness-data.model';

@Injectable({
  providedIn: 'root'
})
export class CalorieService {
  private calorieIntake = 0;
  private burnedCalories = 0;
  private calorieGoal = 2000;

  constructor(
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController
  ) {}

  // Initialize calorie tracking
  async initCalorieTracking(userId: string): Promise<void> {
    // Load today's data from Firebase
    const todayData = await this.firebaseService.getTodayCalorieData(userId).toPromise();
    this.calorieIntake = todayData?.intake || 0;
    this.burnedCalories = todayData?.burned || 0;
    this.calorieGoal = todayData?.goal || 2000;
  }

  // Add calorie intake
  async addCalories(userId: string, amount: number): Promise<void> {
    this.calorieIntake += amount;
    await this.updateCalories(userId);
  }

  // Add burned calories
  async addBurnedCalories(userId: string, amount: number): Promise<void> {
    this.burnedCalories += amount;
    await this.updateCalories(userId);
  }

  // Get current calorie intake
  getCurrentIntake(): number {
    return this.calorieIntake;
  }

  // Get burned calories
  getBurnedCalories(): number {
    return this.burnedCalories;
  }

  // Get net calories
  getNetCalories(): number {
    return this.calorieIntake - this.burnedCalories;
  }

  // Get calorie goal
  getCalorieGoal(): number {
    return this.calorieGoal;
  }

  // Set new calorie goal
  async setCalorieGoal(userId: string, newGoal: number): Promise<void> {
    this.calorieGoal = newGoal;
    await this.updateCalories(userId);
  }

  // Reset all calorie data
  async resetCalories(userId: string): Promise<void> {
    this.calorieIntake = 0;
    this.burnedCalories = 0;
    await this.updateCalories(userId);
  }

  // Update all calorie data in Firebase
  private async updateCalories(userId: string): Promise<void> {
    await this.firebaseService.updateCalorieData(userId, {
      intake: this.calorieIntake,
      burned: this.burnedCalories,
      net: this.getNetCalories(),
      goal: this.calorieGoal
    });
  }
}
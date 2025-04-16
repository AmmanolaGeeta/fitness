import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { WaterData } from '../models/fitness-data.model';

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  getTodayWaterIntake() {
    throw new Error('Method not implemented.');
  }
  resetWaterIntake() {
    throw new Error('Method not implemented.');
  }
  private waterIntake = 0;
  private waterGoal = 2000; // in ml
  private lastNotificationTime = 0;

  constructor(
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController
  ) {}

  // Initialize water tracking
  async initWaterTracking(userId: string): Promise<void> {
    // Load today's data from Firebase
    const todayData = await this.firebaseService.getTodayWaterData(userId).toPromise();
    this.waterIntake = todayData?.amount || 0;
    this.waterGoal = todayData?.goal || 2000;
  }

  // Add water intake
  async addWater(userId: string, amount: number): Promise<void> {
    this.waterIntake += amount;
    await this.firebaseService.updateWaterData(userId, {
      amount: this.waterIntake,
      goal: this.waterGoal
    });
    
    // Check if goal reached
    if (this.waterIntake >= this.waterGoal) {
      this.sendWaterGoalNotification();
    } else {
      this.sendReminderNotification();
    }
  }

  // Get current water intake
  getCurrentWater(): number {
    return this.waterIntake;
  }

  // Get water goal
  getWaterGoal(): number {
    return this.waterGoal;
  }

  // Set new water goal
  async setWaterGoal(userId: string, newGoal: number): Promise<void> {
    this.waterGoal = newGoal;
    await this.firebaseService.updateWaterData(userId, {
      goal: newGoal
    });
  }

  // Reset water intake
  async resetWater(userId: string): Promise<void> {
    this.waterIntake = 0;
    await this.firebaseService.updateWaterData(userId, {
      amount: 0
    });
  }

  // Send notification when goal is reached
  private async sendWaterGoalNotification(): Promise<void> {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Water Goal Achieved!',
          body: `Great job! You've reached your daily water intake goal of ${this.waterGoal}ml.`,
          id: 2,
          schedule: { at: new Date(Date.now() + 1000) }
        }
      ]
    });
  }

  // Send reminder notification (every 2 hours)
  private async sendReminderNotification(): Promise<void> {
    const now = Date.now();
    if (now - this.lastNotificationTime < 2 * 60 * 60 * 1000) return;
    
    this.lastNotificationTime = now;
    
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Stay Hydrated!',
          body: 'Remember to drink some water to stay hydrated.',
          id: 3,
          schedule: { at: new Date(now + 1000) }
        }
      ]
    });
  }
}
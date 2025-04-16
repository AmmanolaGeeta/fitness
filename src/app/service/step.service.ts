import { Injectable } from '@angular/core';
import { Motion } from '@capacitor/motion';
import { Device } from '@capacitor/device';
import { FirebaseService } from './firebase.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { StepData } from '../models/fitness-data.model';


@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepCount = 0;
  private stepGoal = 10000;
  private isTracking = false;

  constructor(
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController
  ) {}

  // Initialize step tracking
  async initStepTracking(userId: string): Promise<void> {
    // Load today's data from Firebase
    const todayData = await this.firebaseService.getTodayStepData(userId).toPromise();
    this.stepCount = todayData?.count || 0;
    this.stepGoal = todayData?.goal || 10000;
    
    // Start tracking if not already
    if (!this.isTracking) {
      this.startTracking(userId);
    }
  }

  // Start step tracking
  private startTracking(userId: string): void {
    this.isTracking = true;
    let lastPosition: any = null;
    let stepDetected = false;

    Motion.addListener('accel', (event) => {
      if (!lastPosition) {
        lastPosition = event.acceleration;
        return;
      }

      // Simple step detection algorithm
      const deltaX = Math.abs(event.acceleration.x - lastPosition.x);
      const deltaY = Math.abs(event.acceleration.y - lastPosition.y);
      const deltaZ = Math.abs(event.acceleration.z - lastPosition.z);

      if ((deltaX > 1.5 || deltaY > 1.5) && !stepDetected) {
        this.stepCount++;
        stepDetected = true;
        
        // Update Firebase
        this.firebaseService.updateStepData(userId, {
          count: this.stepCount,
          goal: this.stepGoal
        });
        
        // Check if goal reached
        if (this.stepCount >= this.stepGoal) {
          this.sendStepGoalNotification();
        }
        
        setTimeout(() => stepDetected = false, 300);
      }

      lastPosition = event.acceleration;
    });
  }

  // Get current step count
  getCurrentSteps(): number {
    return this.stepCount;
  }

  // Get step goal
  getStepGoal(): number {
    return this.stepGoal;
  }

  // Set new step goal
  async setStepGoal(userId: string, newGoal: number): Promise<void> {
    this.stepGoal = newGoal;
    await this.firebaseService.updateStepData(userId, {
      goal: newGoal
    });
  }

  // Reset steps
  async resetSteps(userId: string): Promise<void> {
    this.stepCount = 0;
    await this.firebaseService.updateStepData(userId, {
      count: 0
    });
  }

  // Send notification when goal is reached
  private async sendStepGoalNotification(): Promise<void> {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Step Goal Achieved!',
          body: `Congratulations! You've reached your daily step goal of ${this.stepGoal} steps.`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) }
        }
      ]
    });
  }
}
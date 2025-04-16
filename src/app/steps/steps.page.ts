import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { StepService } from './../service/step.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule], // Add CommonModule here
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepsPage implements OnInit, OnDestroy {
  stepCount = 0;
  stepGoal = 10000;
  progress = 0;
  stepChart: any;
  private userId: string | null = null;
  private userSub: Subscription | null = null;

  constructor(
    private stepService: StepService,
    private alertCtrl: AlertController,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    this.userSub = this.firebaseService.getCurrentUserId().subscribe(async userId => {
      if (userId) {
        this.userId = userId;
        await this.stepService.initStepTracking(userId);
        this.loadStepData();
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  loadStepData() {
    this.stepCount = this.stepService.getCurrentSteps();
    this.stepGoal = this.stepService.getStepGoal();
    this.progress = Math.min((this.stepCount / this.stepGoal) * 100, 100);
    this.createChart();
  }

  async setNewGoal() {
    if (!this.userId) return;

    const alert = await this.alertCtrl.create({
      header: 'Set Step Goal',
      inputs: [
        {
          name: 'goal',
          type: 'number',
          value: this.stepGoal,
          placeholder: 'Daily step goal'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            const newGoal = parseInt(data.goal, 10);
            if (newGoal > 0 && this.userId) {
              await this.stepService.setStepGoal(this.userId, newGoal);
              this.loadStepData();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  createChart() {
    if (this.stepChart) {
      this.stepChart.destroy();
    }

    const ctx = document.getElementById('stepChart') as HTMLCanvasElement;
    this.stepChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Steps Taken', 'Remaining'],
        datasets: [{
          data: [this.stepCount, Math.max(0, this.stepGoal - this.stepCount)],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  async resetSteps() {
    if (this.userId) {
      await this.stepService.resetSteps(this.userId);
      this.loadStepData();
    }
  }
}
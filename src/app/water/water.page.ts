import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WaterService } from './../service/water.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-water',
  templateUrl: './water.page.html',
  styleUrls: ['./water.page.scss'],
    standalone: true,
    imports: [IonicModule ,ReactiveFormsModule], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WaterPage implements OnInit {
  // waterIntake = 0;
  // waterGoal = 2000;
  // progress = 0;
  // waterChart: any;

  // constructor(
  //   private waterService: WaterService,
  //   private alertCtrl: AlertController
  // ) {}

  async ngOnInit() {
  //   await this.loadWaterData();
  }

  // async loadWaterData() {
  //   const waterData = await this.waterService.getTodayWaterIntake();
  //   this.waterIntake = waterData.amount || 0;
  //   this.waterGoal = waterData.goal || 2000;
  //   this.progress = Math.min((this.waterIntake / this.waterGoal) * 100, 100);
  //   this.createChart();
  // }

  // async addWater(amount: number) {
  //   await this.waterService.addWater(amount);
  //   await this.loadWaterData();
  // }

  // async setNewGoal() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Set Water Goal',
  //     inputs: [
  //       {
  //         name: 'goal',
  //         type: 'number',
  //         value: this.waterGoal,
  //         placeholder: 'Daily water goal (ml)'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Save',
  //         handler: async (data) => {
  //           const newGoal = parseInt(data.goal, 10);
  //           if (newGoal > 0) {
  //             await this.waterService.setWaterGoal(newGoal);
  //             this.waterGoal = newGoal;
  //             this.progress = Math.min((this.waterIntake / this.waterGoal) * 100, 100);
  //             this.createChart();
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // createChart() {
  //   if (this.waterChart) {
  //     this.waterChart.destroy();
  //   }

  //   const ctx = document.getElementById('waterChart') as HTMLCanvasElement;
  //   this.waterChart = new Chart(ctx, {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Water Consumed', 'Remaining'],
  //       datasets: [{
  //         data: [this.waterIntake, Math.max(0, this.waterGoal - this.waterIntake)],
  //         backgroundColor: ['#2196F3', '#E0E0E0'],
  //         borderWidth: 0
  //       }]
  //     },
  //     options: {
  //       cutout: '70%',
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       }
  //     }
  //   });
  // }

  // resetWater() {
  //   this.waterService.resetWaterIntake();
  //   this.waterIntake = 0;
  //   this.progress = 0;
  //   this.createChart();
  // }
}
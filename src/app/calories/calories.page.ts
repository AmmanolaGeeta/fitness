import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalorieService } from '../service/calorie.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js';
import { FirebaseService } from '../service/firebase.service';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
  standalone: true,
  imports: [IonicModule ,ReactiveFormsModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class CaloriesPage implements OnInit, OnDestroy {
  // calorieIntake = 0;
  // burnedCalories = 0;
  // netCalories = 0;
  // calorieGoal = 2000;
  // calorieChart: any;
  // private userId: string | null = null;
  // private userSub: Subscription | null = null;

  // constructor(
  //   private calorieService: CalorieService,
  //   private alertCtrl: AlertController,
  //   private firebaseService: FirebaseService
  // ) {}

  async ngOnInit() {
  //   this.userSub = this.firebaseService.getCurrentUserId().subscribe(async userId => {
  //     if (userId) {
  //       this.userId = userId;
  //       await this.calorieService.initCalorieTracking(userId);
  //       this.loadCalorieData();
  //     }
  //   });
  }

  ngOnDestroy() {
  //   if (this.userSub) {
  //     this.userSub.unsubscribe();
  //   }
  }

  // loadCalorieData() {
  //   this.calorieIntake = this.calorieService.getCurrentIntake();
  //   this.burnedCalories = this.calorieService.getBurnedCalories();
  //   this.netCalories = this.calorieService.getNetCalories();
  //   this.calorieGoal = this.calorieService.getCalorieGoal();
  //   this.createChart();
  // }

  // async addCalories(amount: number) {
  //   if (this.userId) {
  //     await this.calorieService.addCalories(this.userId, amount);
  //     this.loadCalorieData();
  //   }
  // }

  // async addBurnedCalories(amount: number) {
  //   if (this.userId) {
  //     await this.calorieService.addBurnedCalories(this.userId, amount);
  //     this.loadCalorieData();
  //   }
  // }

  // async setNewGoal() {
  //   if (!this.userId) return;

  //   const alert = await this.alertCtrl.create({
  //     header: 'Set Calorie Goal',
  //     inputs: [
  //       {
  //         name: 'goal',
  //         type: 'number',
  //         value: this.calorieGoal,
  //         placeholder: 'Daily calorie goal'
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
  //           if (newGoal > 0 && this.userId) {
  //             await this.calorieService.setCalorieGoal(this.userId, newGoal);
  //             this.loadCalorieData();
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // createChart() {
  //   if (this.calorieChart) {
  //     this.calorieChart.destroy();
  //   }

  //   const ctx = document.getElementById('calorieChart') as HTMLCanvasElement;
  //   this.calorieChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Intake', 'Burned', 'Net'],
  //       datasets: [{
  //         data: [this.calorieIntake, this.burnedCalories, this.netCalories],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.7)',
  //           'rgba(54, 162, 235, 0.7)',
  //           'rgba(75, 192, 192, 0.7)'
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(75, 192, 192, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       }
  //     }
  //   });
  // }

  // async resetCalories() {
  //   if (this.userId) {
  //     await this.calorieService.resetCalories(this.userId);
  //     this.loadCalorieData();
  //   }
  // }
}
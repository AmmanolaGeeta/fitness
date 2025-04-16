export interface User {
  uid?: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt?: Date;
  dailyStepGoal?: number;
  dailyWaterGoal?: number;
  dailyCalorieGoal?: number;
}
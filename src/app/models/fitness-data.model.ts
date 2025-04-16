export interface StepData {
    userId: string;
    date: string;
    count: number;
    goal: number;
    updatedAt: Date;
  }
  
  export interface WaterData {
    userId: string;
    date: string;
    amount: number; // in ml
    goal: number;
    updatedAt: Date;
  }
  
  export interface CalorieData {
    userId: string;
    date: string;
    intake: number;
    burned: number;
    net: number;
    goal: number;
    updatedAt: Date;
  }
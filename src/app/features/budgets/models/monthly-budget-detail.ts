import { MonthlyBudget } from './monthly-budget';

export interface MonthlyBudgetDetail extends MonthlyBudget {
  createdAt: string;
  updatedAt: string;
}

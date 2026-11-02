import { CategoryReference } from '@shared/category/models/category-reference';

export interface MonthlyBudget {
  id: string;
  month: number;
  year: number;
  expectedAmount: number;
  actualAmount: number;
  remainingAmount: number;
  category: CategoryReference;
}

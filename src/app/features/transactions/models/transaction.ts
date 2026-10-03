import { CategoryReference } from '@shared/category/models/category-reference';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  notes: string;
  category: CategoryReference;
}

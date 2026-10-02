import { Category } from './category';

export interface CategoryDetail extends Category {
  createdAt: string;
  updatedAt: string;
}

import { Category } from '@shared/category/models/category';

export interface CategoryReference extends Category {
  deleted: boolean;
}

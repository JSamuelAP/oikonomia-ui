import { Component, input } from '@angular/core';
import { Eye } from '@primeicons/angular/eye';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';
import { ButtonModule } from 'primeng/button';

import { Category } from '@shared/category/models/category';

@Component({
  imports: [ButtonModule, Eye, Pencil, Trash],
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.html',
})
export class CategoryListItem {
  readonly category = input.required<Category>();
}

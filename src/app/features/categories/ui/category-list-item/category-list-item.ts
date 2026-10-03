import { Component, input, output } from '@angular/core';
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
  readonly show = output<Category>();
  readonly edit = output<Category>();
  readonly delete = output<Category>();

  protected handleShowClick() {
    this.show.emit(this.category());
  }

  protected handleEditClick() {
    this.edit.emit(this.category());
  }

  protected handleDeleteClick() {
    this.delete.emit(this.category());
  }
}

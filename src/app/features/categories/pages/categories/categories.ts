import { Component, computed, inject, signal } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { Plus } from '@primeicons/angular/plus';
import { Search } from '@primeicons/angular/search';
import { Times } from '@primeicons/angular/times';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { CategoryStore } from '@shared/category/category.store';
import { CategoryFacade } from '@categories/data-access/category.facade';
import { CreateCategoryRequest } from '@categories/data-access/models/create-category-request';
import { CategoryForm } from '@categories/ui/category-form/category-form';
import { CategoryList } from '@categories/ui/category-list/category-list';

@Component({
  imports: [
    ButtonModule,
    CategoryForm,
    CategoryList,
    DialogModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    Plus,
    Search,
    Times,
  ],
  selector: 'app-categories',
  templateUrl: './categories.html',
})
export class Categories {
  private readonly categoryStore = inject(CategoryStore);
  private readonly categoryFacade = inject(CategoryFacade);

  protected readonly searchQuery = signal('');
  protected readonly showCreateDialog = signal(false);

  protected readonly incomeCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let cats = this.categoryStore.categories.value().filter((c) => c.flowType === 'INCOME');
    if (query) cats = cats.filter((c) => c.name.toLowerCase().includes(query));
    return cats;
  });

  protected readonly expenseCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let cats = this.categoryStore.categories.value().filter((c) => c.flowType === 'EXPENSE');
    if (query) cats = cats.filter((c) => c.name.toLowerCase().includes(query));
    return cats;
  });

  protected openCreateDialog() {
    this.showCreateDialog.set(true);
  }

  protected closeCreateDialog() {
    this.showCreateDialog.set(false);
  }

  protected readonly handleCreateCategory = async (data: CreateCategoryRequest): Promise<ValidationError | void> => {
    const error = await this.categoryFacade.create(data);
    if (error) return error;
    this.showCreateDialog.set(false);
  };
}

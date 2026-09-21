import { Component, computed, inject, signal } from '@angular/core';
import { Plus } from '@primeicons/angular/plus';
import { Search } from '@primeicons/angular/search';
import { Times } from '@primeicons/angular/times';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { CategoryStore } from '@shared/category/category.store';
import { CategoryList } from '@categories/ui/category-list/category-list';

@Component({
  imports: [
    ButtonModule,
    CategoryList,
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

  protected readonly searchQuery = signal('');

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
}

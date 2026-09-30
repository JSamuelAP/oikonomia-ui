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
import { Category } from '@shared/category/models/category';
import { CategoryFacade } from '@categories/data-access/category.facade';
import { CategoryFormValue } from '@categories/models/category-form-value';
import { CategoryForm } from '@categories/ui/category-form/category-form';
import { CategoryList } from '@categories/ui/category-list/category-list';

type CategoryDialogState = { mode: 'create' } | { mode: 'edit'; category: Category };

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
  protected readonly dialogState = signal<CategoryDialogState | null>(null);
  protected readonly renderedState = signal<CategoryDialogState | null>(null);

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
    this.dialogState.set({ mode: 'create' });
    this.renderedState.set({ mode: 'create' });
  }

  protected openEditDialog(category: Category) {
    this.dialogState.set({ mode: 'edit', category });
    this.renderedState.set({ mode: 'edit', category });
  }

  protected closeDialog() {
    this.dialogState.set(null);
  }

  protected handleDialogHidden() {
    // Para desaparecer el formulario hasta que el dialogo se haya cerrado completamente
    this.renderedState.set(null);
  }

  protected readonly handleCreateCategory = async (data: CategoryFormValue): Promise<ValidationError | void> => {
    const error = await this.categoryFacade.create(data);
    if (error) return error;
    this.closeDialog();
  };

  protected handleUpdateCategory(id: string): (data: CategoryFormValue) => Promise<ValidationError | void> {
    return async (data: CategoryFormValue): Promise<ValidationError | void> => {
      const error = await this.categoryFacade.update(id, data);
      if (error) return error;
      this.closeDialog();
    };
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ValidationError } from '@angular/forms/signals';
import { Plus } from '@primeicons/angular/plus';
import { Search } from '@primeicons/angular/search';
import { Times } from '@primeicons/angular/times';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { of } from 'rxjs';

import { CategoryApiService } from '@shared/category/category-api.service';
import { CategoryStore } from '@shared/category/category.store';
import { Category } from '@shared/category/models/category';
import { CategoryFacade } from '@categories/data-access/category.facade';
import { CategoryFormValue } from '@categories/models/category-form-value';
import { CategoryDetailView } from '@categories/ui/category-detail-view/category-detail-view';
import { CategoryForm } from '@categories/ui/category-form/category-form';
import { CategoryList } from '@categories/ui/category-list/category-list';

type CategoryFormDialogState = { mode: 'create' } | { mode: 'edit'; category: Category };

@Component({
  imports: [
    ButtonModule,
    CategoryDetailView,
    CategoryForm,
    CategoryList,
    ConfirmDialogModule,
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
  providers: [ConfirmationService],
})
export class Categories {
  private readonly categoryApi = inject(CategoryApiService);
  private readonly categoryStore = inject(CategoryStore);
  private readonly categoryFacade = inject(CategoryFacade);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  protected readonly searchQuery = signal('');

  protected readonly viewCategoryId = signal<string | null>(null);
  protected readonly renderViewDialog = signal(false);
  protected readonly viewDialogVisible = signal(false);

  protected readonly formDialogState = signal<CategoryFormDialogState | null>(null);
  protected readonly renderedFormState = signal<CategoryFormDialogState | null>(null);

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

  protected readonly categoryDetail = rxResource({
    params: () => this.viewCategoryId(),
    stream: ({ params: id }) => (id ? this.categoryApi.getById(id) : of(undefined)),
  });

  protected openViewDialog(category: Category) {
    this.renderViewDialog.set(true);
    this.viewCategoryId.set(category.id);
    this.viewDialogVisible.set(true);
  }

  protected closeViewDialog() {
    this.viewDialogVisible.set(false);
  }

  protected handleViewDialogHidden() {
    this.renderViewDialog.set(false);
    this.viewCategoryId.set(null);
  }

  protected openCreateDialog() {
    this.formDialogState.set({ mode: 'create' });
    this.renderedFormState.set({ mode: 'create' });
  }

  protected openEditDialog(category: Category) {
    this.formDialogState.set({ mode: 'edit', category });
    this.renderedFormState.set({ mode: 'edit', category });
  }

  protected closeFormDialog() {
    this.formDialogState.set(null);
  }

  protected handleFormDialogHidden() {
    // Para desaparecer el formulario hasta que el dialogo se haya cerrado completamente
    this.renderedFormState.set(null);
  }

  protected openDeleteDialog(category: Category): void {
    this.confirmationService.confirm({
      message: `¿Eliminar la categoría <strong>${category.name}</strong>?<br/>Las transacciones asociadas se mantendrán sin categoría.`,
      header: 'Eliminar categoría',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
      },
      accept: () => {
        this.deleteCategory(category);
      },
    });
  }

  protected readonly handleCreateCategory = async (data: CategoryFormValue): Promise<ValidationError | void> => {
    const error = await this.categoryFacade.create(data);
    if (error) return error;
    this.closeFormDialog();
  };

  protected handleUpdateCategory(id: string): (data: CategoryFormValue) => Promise<ValidationError | void> {
    return async (data: CategoryFormValue): Promise<ValidationError | void> => {
      const error = await this.categoryFacade.update(id, data);
      if (error) return error;
      this.closeFormDialog();
    };
  }

  private async deleteCategory(category: Category): Promise<void> {
    const success = await this.categoryFacade.delete(category.id);

    this.messageService.add(
      success
        ? {
            severity: 'success',
            summary: 'Categoría eliminada',
            detail: `"${category.name}" se eliminó correctamente.`,
          }
        : { severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la categoría. Intenta de nuevo.' },
    );
  }
}

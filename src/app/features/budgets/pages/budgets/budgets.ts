import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Plus } from '@primeicons/angular/plus';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

import { CategoryStore } from '@shared/category/category.store';
import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { addMonths } from '@shared/util/date';
import { BudgetDetailView } from '@budgets/ui/budget-detail-view/budget-detail-view';

import { BudgetApiService } from '../../data-access/budget-api.service';
import { MonthlyBudget } from '../../models/monthly-budget';
import { BudgetTable } from '../../ui/budget-table/budget-table';

@Component({
  imports: [ButtonModule, DialogModule, MonthPicker, Plus, BudgetTable, BudgetDetailView],
  selector: 'app-budgets',
  templateUrl: './budgets.html',
})
export class Budgets {
  private readonly budgetApi = inject(BudgetApiService);
  protected readonly categoryStore = inject(CategoryStore);

  protected readonly today = new Date();

  protected readonly currentMonth = signal<Date>(new Date());
  protected readonly budgets = rxResource({
    params: () => this.currentMonth(),
    stream: ({ params: month }) => this.budgetApi.getAll(month),
    defaultValue: [],
  });

  protected readonly previousMonth = computed(() => addMonths(this.currentMonth(), -1));

  protected readonly viewBudgetId = signal<string | null>(null);
  protected readonly renderViewDialog = signal(false);
  protected readonly viewDialogVisible = signal(false);

  protected readonly budgetDetail = rxResource({
    params: () => this.viewBudgetId(),
    stream: ({ params: id }) => (id ? this.budgetApi.getById(id) : of(undefined)),
  });

  protected openViewDialog(budget: MonthlyBudget) {
    this.renderViewDialog.set(true);
    this.viewBudgetId.set(budget.id);
    this.viewDialogVisible.set(true);
  }

  protected closeViewDialog() {
    this.viewDialogVisible.set(false);
  }

  protected handleViewDialogHidden() {
    this.renderViewDialog.set(false);
    this.viewBudgetId.set(null);
  }
}

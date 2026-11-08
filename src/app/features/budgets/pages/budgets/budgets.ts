import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ValidationError } from '@angular/forms/signals';
import { Plus } from '@primeicons/angular/plus';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

import { injectMonthlyBalance } from '@shared/balance/inject-monthly-balance';
import { BudgetBalanceSummary } from '@shared/balance/ui/budget-balance-summary/budget-balance-summary';
import { CategoryStore } from '@shared/category/category.store';
import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { monthIndex } from '@shared/util/date';
import { BudgetFacade } from '@budgets/data-access/budget.facade';
import { CreateBudgetRequest } from '@budgets/data-access/models/create-budget-request';
import { UpdateBudgetRequest } from '@budgets/data-access/models/update-budget-request';
import { BudgetDetailView } from '@budgets/ui/budget-detail-view/budget-detail-view';
import { BudgetForm } from '@budgets/ui/budget-form/budget-form';
import { budgetStatus } from '@budgets/utils/budget-status';

import { BudgetApiService } from '../../data-access/budget-api.service';
import { MonthlyBudget } from '../../models/monthly-budget';
import { BudgetTable } from '../../ui/budget-table/budget-table';

type BudgetFormDialogState = { mode: 'create' } | { mode: 'edit'; budget: MonthlyBudget };

@Component({
  imports: [
    BudgetBalanceSummary,
    BudgetDetailView,
    BudgetForm,
    ButtonModule,
    BudgetTable,
    ConfirmDialog,
    DialogModule,
    MonthPicker,
    Plus,
  ],
  selector: 'app-budgets',
  templateUrl: './budgets.html',
  providers: [ConfirmationService],
})
export class Budgets {
  private readonly budgetApi = inject(BudgetApiService);
  private readonly budgetFacade = inject(BudgetFacade);
  protected readonly categoryStore = inject(CategoryStore);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  protected readonly today = new Date();

  protected readonly currentMonth = signal<Date>(new Date());
  protected readonly budgets = rxResource({
    params: () => this.currentMonth(),
    stream: ({ params: month }) => this.budgetApi.getAll(month),
    defaultValue: [],
  });

  protected readonly balance = injectMonthlyBalance(this.currentMonth, (month) => this.budgetApi.getBalance(month));
  protected readonly overCount = computed(
    () =>
      this.budgets
        .value()
        .filter(
          (b) =>
            budgetStatus(
              b.category.flowType,
              b.expectedAmount,
              b.actualAmount,
              b.remainingAmount,
              this.monthClosed(),
            ) === 'over',
        ).length,
  );

  protected readonly viewBudgetId = signal<string | null>(null);
  protected readonly renderViewDialog = signal(false);
  protected readonly viewDialogVisible = signal(false);

  protected readonly monthClosed = computed(() => monthIndex(this.currentMonth()) < monthIndex(new Date()));

  protected readonly formDialogState = signal<BudgetFormDialogState | null>(null);
  protected readonly renderedFormState = signal<BudgetFormDialogState | null>(null);

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

  protected openCreateDialog() {
    this.formDialogState.set({ mode: 'create' });
    this.renderedFormState.set({ mode: 'create' });
  }

  protected openEditDialog(budget: MonthlyBudget) {
    this.formDialogState.set({ mode: 'edit', budget });
    this.renderedFormState.set({ mode: 'edit', budget });
  }

  protected closeFormDialog() {
    this.formDialogState.set(null);
  }

  protected handleFormDialogHidden() {
    this.renderedFormState.set(null);
  }

  protected openDeleteDialog(budget: MonthlyBudget): void {
    this.confirmationService.confirm({
      message: `¿Eliminar el presupuesto para <strong>${budget.category.name}</strong>?<br/>Esta acción no se podrá deshacer.`,
      header: 'Eliminar presupuesto',
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
        this.deleteBudget(budget);
      },
    });
  }

  protected readonly handleCreateBudget = async (data: CreateBudgetRequest): Promise<ValidationError | void> => {
    const error = await this.budgetFacade.create(data);
    if (error) return error;
    this.budgets.reload();
    this.balance.reload();
    this.closeFormDialog();
  };

  protected handleUpdateBudget(id: string): (data: UpdateBudgetRequest) => Promise<ValidationError | void> {
    return async (data: UpdateBudgetRequest): Promise<ValidationError | void> => {
      const error = await this.budgetFacade.update(id, data);
      if (error) return error;
      this.budgets.reload();
      this.balance.reload();
      this.closeFormDialog();
    };
  }

  private async deleteBudget(budget: MonthlyBudget): Promise<void> {
    const success = await this.budgetFacade.delete(budget.id);

    if (success) {
      this.budgets.reload();
      this.balance.reload();
    }

    this.messageService.add(
      success
        ? {
            severity: 'success',
            summary: 'Presupuesto eliminado',
            detail: 'El presupuesto se eliminó correctamente.',
          }
        : { severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el presupuesto. Intenta de nuevo.' },
    );
  }
}

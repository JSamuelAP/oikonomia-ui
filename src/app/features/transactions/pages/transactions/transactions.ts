import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ValidationError } from '@angular/forms/signals';
import { Plus } from '@primeicons/angular/plus';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

import { CategoryStore } from '@shared/category/category.store';
import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { CreateTransactionRequest } from '@transactions/data-access/models/create-transaction-request';
import { UpdateTransactionRequest } from '@transactions/data-access/models/update-transaction-request';
import { TransactionApiService } from '@transactions/data-access/transaction-api.service';
import { TransactionFacade } from '@transactions/data-access/transaction.facade';
import { Transaction } from '@transactions/models/transaction';
import { TransactionDetailView } from '@transactions/ui/transaction-detail-view/transaction-detail-view';
import { TransactionForm } from '@transactions/ui/transaction-form/transaction-form';
import { TransactionTable } from '@transactions/ui/transaction-table/transaction-table';

type TransactionFormDialogState = { mode: 'create' } | { mode: 'edit'; transaction: Transaction };

@Component({
  imports: [
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    MonthPicker,
    TransactionTable,
    TransactionDetailView,
    Plus,
    TransactionForm,
  ],
  selector: 'app-transactions',
  templateUrl: './transactions.html',
  providers: [ConfirmationService],
})
export class Transactions {
  private readonly transactionApi = inject(TransactionApiService);
  protected readonly transactionFacade = inject(TransactionFacade);
  protected readonly categoryStore = inject(CategoryStore);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  protected readonly currentMonth = signal<Date>(new Date());
  protected readonly transactions = rxResource({
    params: () => this.currentMonth(),
    stream: ({ params: month }) => this.transactionApi.getAll(month),
    defaultValue: [],
  });

  protected readonly viewTransactionId = signal<string | null>(null);
  protected readonly renderViewDialog = signal(false);
  protected readonly viewDialogVisible = signal(false);

  protected readonly formDialogState = signal<TransactionFormDialogState | null>(null);
  protected readonly renderedFormState = signal<TransactionFormDialogState | null>(null);

  protected readonly transactionDetail = rxResource({
    params: () => this.viewTransactionId(),
    stream: ({ params: id }) => (id ? this.transactionApi.getById(id) : of(undefined)),
  });

  protected openViewDialog(transaction: Transaction) {
    this.renderViewDialog.set(true);
    this.viewTransactionId.set(transaction.id);
    this.viewDialogVisible.set(true);
  }

  protected closeViewDialog() {
    this.viewDialogVisible.set(false);
  }

  protected handleViewDialogHidden() {
    this.renderViewDialog.set(false);
    this.viewTransactionId.set(null);
  }

  protected openCreateDialog() {
    this.formDialogState.set({ mode: 'create' });
    this.renderedFormState.set({ mode: 'create' });
  }

  protected openEditDialog(transaction: Transaction) {
    this.formDialogState.set({ mode: 'edit', transaction });
    this.renderedFormState.set({ mode: 'edit', transaction });
  }

  protected closeFormDialog() {
    this.formDialogState.set(null);
  }

  protected handleFormDialogHidden() {
    this.renderedFormState.set(null);
  }

  protected openDeleteDialog(transaction: Transaction): void {
    this.confirmationService.confirm({
      message: `¿Eliminar la transacción del <strong>${transaction.date}</strong>?<br/>Esta acción no se podrá deshacer.`,
      header: 'Eliminar transacción',
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
        this.deleteTransaction(transaction);
      },
    });
  }

  protected readonly handleCreateTransaction = async (
    data: CreateTransactionRequest,
  ): Promise<ValidationError | void> => {
    const error = await this.transactionFacade.create(data);
    if (error) return error;
    this.transactions.reload();
    this.closeFormDialog();
  };

  protected handleUpdateTransaction(id: string): (data: UpdateTransactionRequest) => Promise<ValidationError | void> {
    return async (data: UpdateTransactionRequest): Promise<ValidationError | void> => {
      const error = await this.transactionFacade.update(id, data);
      if (error) return error;
      this.transactions.reload();
      this.closeFormDialog();
    };
  }

  private async deleteTransaction(transaction: Transaction): Promise<void> {
    const success = await this.transactionFacade.delete(transaction.id);

    if (success) this.transactions.reload();

    this.messageService.add(
      success
        ? {
            severity: 'success',
            summary: 'Transacción eliminada',
            detail: 'La transacción se eliminó correctamente.',
          }
        : { severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la transacción. Intenta de nuevo.' },
    );
  }
}

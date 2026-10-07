import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ValidationError } from '@angular/forms/signals';
import { Plus } from '@primeicons/angular/plus';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

import { CategoryStore } from '@shared/category/category.store';
import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { CreateTransactionRequest } from '@transactions/data-access/models/create-transaction-request';
import { TransactionApiService } from '@transactions/data-access/transaction-api.service';
import { TransactionFacade } from '@transactions/data-access/transaction.facade';
import { Transaction } from '@transactions/models/transaction';
import { TransactionDetailView } from '@transactions/ui/transaction-detail-view/transaction-detail-view';
import { TransactionForm } from '@transactions/ui/transaction-form/transaction-form';
import { TransactionTable } from '@transactions/ui/transaction-table/transaction-table';

type TransactionFormDialogState = { mode: 'create' } | { mode: 'edit'; transaction: Transaction };

@Component({
  imports: [ButtonModule, DialogModule, MonthPicker, TransactionTable, TransactionDetailView, Plus, TransactionForm],
  selector: 'app-transactions',
  templateUrl: './transactions.html',
})
export class Transactions {
  private readonly transactionApi = inject(TransactionApiService);
  protected readonly transactionFacade = inject(TransactionFacade);
  protected readonly categoryStore = inject(CategoryStore);

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

  protected closeFormDialog() {
    this.formDialogState.set(null);
  }

  protected handleFormDialogHidden() {
    this.renderedFormState.set(null);
  }

  protected readonly handleCreateTransaction = async (
    data: CreateTransactionRequest,
  ): Promise<ValidationError | void> => {
    const error = await this.transactionFacade.create(data);
    if (error) return error;
    this.transactions.reload();
    this.closeFormDialog();
  };
}

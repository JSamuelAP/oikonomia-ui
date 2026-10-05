import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { TransactionApiService } from '@transactions/data-access/transaction-api.service';
import { Transaction } from '@transactions/models/transaction';
import { TransactionDetailView } from '@transactions/ui/transaction-detail-view/transaction-detail-view';
import { TransactionTable } from '@transactions/ui/transaction-table/transaction-table';

@Component({
  imports: [DialogModule, MonthPicker, TransactionTable, TransactionDetailView],
  selector: 'app-transactions',
  templateUrl: './transactions.html',
})
export class Transactions {
  private readonly transactionApi = inject(TransactionApiService);

  protected readonly currentMonth = signal<Date>(new Date());
  protected readonly transactions = rxResource({
    params: () => this.currentMonth(),
    stream: ({ params: month }) => this.transactionApi.getAll(month),
    defaultValue: [],
  });

  protected readonly viewTransactionId = signal<string | null>(null);
  protected readonly renderViewDialog = signal(false);
  protected readonly viewDialogVisible = signal(false);

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
}

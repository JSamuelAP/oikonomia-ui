import { Component, computed, inject } from '@angular/core';

import { TransactionStore } from '@transactions/data-access/transaction.store';
import { Transaction } from '@transactions/models/transaction';
import { TransactionTable } from '@transactions/ui/transaction-table/transaction-table';

@Component({
  imports: [TransactionTable],
  selector: 'app-transactions',
  templateUrl: './transactions.html',
})
export class Transactions {
  private readonly store = inject(TransactionStore);

  protected readonly transactions = computed<Transaction[]>(() => this.store.transactions.value());
}

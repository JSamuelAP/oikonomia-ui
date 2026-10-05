import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Eye } from '@primeicons/angular/eye';
import { PIcon } from '@primeicons/angular/p-icon';
import { Pencil } from '@primeicons/angular/pencil';
import { Plus } from '@primeicons/angular/plus';
import { Receipt } from '@primeicons/angular/receipt';
import { Search } from '@primeicons/angular/search';
import { Trash } from '@primeicons/angular/trash';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { CategoryReference } from '@shared/category/models/category-reference';
import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { Transaction } from '@transactions/models/transaction';

@Component({
  imports: [
    ButtonModule,
    CurrencyPipe,
    DatePipe,
    Eye,
    IconField,
    InputIcon,
    InputTextModule,
    Pencil,
    PIcon,
    Plus,
    Receipt,
    Search,
    TableModule,
    TagModule,
    Trash,
    UpperCasePipe,
  ],
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.html',
})
export class TransactionTable {
  readonly transactions = input<Transaction[]>([]);
  readonly show = output<Transaction>();

  protected flowTypeDisplay(category: CategoryReference): FlowTypeDisplay {
    return FLOW_TYPE_DISPLAY[category.flowType];
  }

  protected formatAmount(amount: number, flowType: 'INCOME' | 'EXPENSE'): number {
    return flowType === 'EXPENSE' ? -amount : amount;
  }

  protected customSort(event: SortEvent): void {
    const field = event.field ?? '';
    const order = event.order ?? 1;

    event.data?.sort((a: Transaction, b: Transaction) => {
      const value1 = this.resolveSortValue(a, field);
      const value2 = this.resolveSortValue(b, field);
      return order * this.compareValue(value1, value2);
    });
  }

  private resolveSortValue(transaction: Transaction, field: string): unknown {
    if (field === 'category') {
      return transaction.category.name;
    }
    return Reflect.get(transaction, field);
  }

  private compareValue(value1: unknown, value2: unknown): number {
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2, 'es');
    }
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2;
    }
    return 0;
  }

  protected handleShowClick(transaction: Transaction) {
    this.show.emit(transaction);
  }
}

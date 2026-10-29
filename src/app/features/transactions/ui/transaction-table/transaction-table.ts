import { DatePipe, UpperCasePipe } from '@angular/common';
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

import { TypedRow } from '@shared/directives/typed-row';
import { FLOW_TYPE_DISPLAY } from '@shared/models/flow-type';
import { SignedCurrencyPipe } from '@shared/pipes/signed-currency.pipe';
import { Transaction } from '@transactions/models/transaction';

@Component({
  imports: [
    ButtonModule,
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
    SignedCurrencyPipe,
    TableModule,
    TagModule,
    Trash,
    TypedRow,
    UpperCasePipe,
  ],
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.html',
})
export class TransactionTable {
  readonly transactions = input<Transaction[]>([]);
  readonly show = output<Transaction>();
  readonly edit = output<Transaction>();
  readonly delete = output<Transaction>();
  readonly create = output<void>();

  protected readonly flowTypeDisplay = FLOW_TYPE_DISPLAY;

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

  protected handleEditClick(transaction: Transaction) {
    this.edit.emit(transaction);
  }

  protected handleDeleteClick(transaction: Transaction) {
    this.delete.emit(transaction);
  }

  protected handleCreateClick() {
    this.create.emit();
  }
}

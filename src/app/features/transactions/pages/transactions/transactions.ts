import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { MonthPicker } from '@shared/ui/month-picker/month-picker';
import { TransactionApiService } from '@transactions/data-access/transaction-api.service';
import { TransactionTable } from '@transactions/ui/transaction-table/transaction-table';

@Component({
  imports: [TransactionTable, MonthPicker],
  selector: 'app-transactions',
  templateUrl: './transactions.html',
})
export class Transactions {
  private readonly apiService = inject(TransactionApiService);

  protected readonly currentMonth = signal<Date>(new Date());
  protected readonly transactions = rxResource({
    params: () => this.currentMonth(),
    stream: ({ params: month }) => this.apiService.getAll(month),
    defaultValue: [],
  });
}

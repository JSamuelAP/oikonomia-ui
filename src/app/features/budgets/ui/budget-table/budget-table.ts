import { Component, computed, input, output } from '@angular/core';
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
import { MonthlyBudget } from '@budgets/models/monthly-budget';

@Component({
  imports: [
    ButtonModule,
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
  ],
  selector: 'app-budget-table',
  templateUrl: './budget-table.html',
})
export class BudgetTable {
  readonly budgets = input<MonthlyBudget[]>([]);
  readonly show = output<MonthlyBudget>();

  protected readonly flowTypeDisplay = FLOW_TYPE_DISPLAY;

  protected readonly incomeLength = computed(
    () => this.budgets().filter((t) => t.category.flowType === 'INCOME').length,
  );
  protected readonly expenseLength = computed(
    () => this.budgets().filter((t) => t.category.flowType === 'EXPENSE').length,
  );

  protected customSort(event: SortEvent): void {
    const field = event.field ?? '';
    const order = event.order ?? 1;

    event.data?.sort((a: MonthlyBudget, b: MonthlyBudget) => {
      const value1 = this.resolveSortValue(a, field);
      const value2 = this.resolveSortValue(b, field);
      return order * this.compareValue(value1, value2);
    });
  }

  private resolveSortValue(transaction: MonthlyBudget, field: string): unknown {
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

  protected handleShowClick(budget: MonthlyBudget) {
    this.show.emit(budget);
  }
}

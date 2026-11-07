import { Component, computed, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { Wallet } from '@primeicons/angular/wallet';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Tag } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY } from '@shared/models/flow-type';
import { SignedCurrencyPipe } from '@shared/pipes/signed-currency.pipe';
import { StatCard } from '@shared/ui/stat-card/stat-card';
import { MonthlyBudgetBalance } from '@budgets/models/monthly-budget-balance';
import { BudgetProgress } from '@budgets/ui/budget-progress/budget-progress';

@Component({
  imports: [BudgetProgress, ButtonModule, MessageModule, PIcon, SignedCurrencyPipe, StatCard, Tag, Wallet],
  selector: 'app-budget-balance-summary',
  templateUrl: './budget-balance-summary.html',
})
export class BudgetBalanceSummary {
  readonly balance = input<MonthlyBudgetBalance>();
  readonly monthClosed = input(false);
  readonly overCount = input(0);
  readonly loading = input(false);
  readonly error = input(false);
  readonly retry = output<void>();

  protected readonly hasIncomePlan = computed(() => (this.balance()?.income.expected ?? 0) > 0);
  protected readonly hasExpensePlan = computed(() => (this.balance()?.expense.expected ?? 0) > 0);

  protected readonly income = FLOW_TYPE_DISPLAY.INCOME;
  protected readonly expense = FLOW_TYPE_DISPLAY.EXPENSE;

  protected readonly expectedBalanceSeverity = computed<'success' | 'danger' | 'neutral'>(() => {
    if (!this.hasIncomePlan()) return 'neutral';
    const value = this.balance()?.expectedBalance ?? 0;
    if (value > 0) return 'success';
    if (value < 0) return 'danger';
    return 'neutral';
  });
}

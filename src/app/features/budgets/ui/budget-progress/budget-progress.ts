import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';

import { FlowType } from '@shared/models/flow-type';
import { BUDGET_STATUS_DISPLAY, budgetMessageKey, budgetStatus } from '@budgets/utils/budget-status';

@Component({
  imports: [CurrencyPipe, PercentPipe, PIcon],
  selector: 'app-budget-progress',
  templateUrl: './budget-progress.html',
})
export class BudgetProgress {
  readonly flow = input.required<FlowType>();
  readonly expected = input.required<number>();
  readonly actual = input.required<number>();
  readonly remaining = input.required<number>();
  readonly monthClosed = input(false);

  protected readonly status = computed(() =>
    budgetStatus(this.flow(), this.expected(), this.actual(), this.remaining(), this.monthClosed()),
  );
  protected readonly display = computed(() => BUDGET_STATUS_DISPLAY[this.status()]);
  protected readonly messageKey = computed(() => budgetMessageKey(this.status(), this.remaining(), this.monthClosed()));
  protected readonly usage = computed(() => (this.expected() > 0 ? this.actual() / this.expected() : 0));
  protected readonly barWidth = computed(() => Math.min(this.usage(), 1) * 100);
  protected readonly left = computed(() => Math.max(this.remaining(), 0));
  protected readonly surplus = computed(() => Math.max(-this.remaining(), 0));
}

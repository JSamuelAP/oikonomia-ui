import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { SignedCurrencyPipe } from '@shared/pipes/signed-currency.pipe';
import { AuditDates } from '@shared/ui/audit-dates/audit-dates';
import { MonthlyBudgetDetail } from '@budgets/models/monthly-budget-detail';
import {
  BUDGET_STATUS_DISPLAY,
  budgetMessageKey,
  budgetStatus,
  displayedRemaining,
} from '@budgets/utils/budget-status';

@Component({
  imports: [AuditDates, CurrencyPipe, PercentPipe, PIcon, SignedCurrencyPipe, TagModule],
  selector: 'app-budget-detail-view',
  templateUrl: './budget-detail-view.html',
})
export class BudgetDetailView {
  readonly budget = input.required<MonthlyBudgetDetail>();
  readonly monthClosed = input(false);

  protected readonly flow = computed(() => this.budget().category.flowType);
  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(
    () => FLOW_TYPE_DISPLAY[this.budget().category.flowType],
  );

  protected readonly status = computed(() => {
    const { expectedAmount, actualAmount, remainingAmount } = this.budget();
    return budgetStatus(this.flow(), expectedAmount, actualAmount, remainingAmount, this.monthClosed());
  });
  protected readonly display = computed(() => BUDGET_STATUS_DISPLAY[this.status()]);

  protected readonly usage = computed(() => {
    const { expectedAmount, actualAmount } = this.budget();
    return expectedAmount > 0 ? actualAmount / expectedAmount : 0;
  });
  protected readonly barWidth = computed(() => Math.min(this.usage(), 1) * 100);

  protected readonly remaining = computed(() => displayedRemaining(this.flow(), this.budget().remainingAmount));
  protected readonly left = computed(() => Math.max(this.budget().remainingAmount, 0));
  protected readonly surplus = computed(() => Math.max(-this.budget().remainingAmount, 0));
  protected readonly actualLabel = computed(() => (this.flow() === 'INCOME' ? 'Recibido' : 'Gastado'));
  protected readonly messageKey = computed(() =>
    budgetMessageKey(this.status(), this.budget().remainingAmount, this.monthClosed()),
  );
}

import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { SignedCurrencyPipe } from '@shared/pipes/signed-currency.pipe';
import { AuditDates } from '@shared/ui/audit-dates/audit-dates';
import { MonthlyBudgetDetail } from '@budgets/models/monthly-budget-detail';
import { BUDGET_STATUS_DISPLAY, budgetStatus, displayedRemaining } from '@budgets/utils/budget-status';

import { BudgetProgress } from '../budget-progress/budget-progress';

@Component({
  imports: [AuditDates, BudgetProgress, CurrencyPipe, PIcon, SignedCurrencyPipe, TagModule],
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
  protected readonly remaining = computed(() => displayedRemaining(this.flow(), this.budget().remainingAmount));
  protected readonly actualLabel = computed(() => (this.flow() === 'INCOME' ? 'Recibido' : 'Gastado'));
}

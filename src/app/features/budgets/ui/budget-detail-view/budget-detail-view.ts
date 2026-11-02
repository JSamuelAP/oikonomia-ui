import { CurrencyPipe } from '@angular/common';
import { Component, input, linkedSignal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { AuditDates } from '@shared/ui/audit-dates/audit-dates';
import { MonthlyBudgetDetail } from '@budgets/models/monthly-budget-detail';

@Component({
  imports: [CurrencyPipe, PIcon, TagModule, AuditDates],
  selector: 'app-budget-detail-view',
  templateUrl: './budget-detail-view.html',
})
export class BudgetDetailView {
  readonly budget = input.required<MonthlyBudgetDetail>();

  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(
    () => FLOW_TYPE_DISPLAY[this.budget().category.flowType],
  );
}

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input, linkedSignal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { AuditDates } from '@shared/ui/audit-dates/audit-dates';
import { TransactionDetail } from '@transactions/models/transaction-detail';

@Component({
  imports: [CurrencyPipe, DatePipe, PIcon, TagModule, AuditDates],
  selector: 'app-transaction-detail-view',
  templateUrl: './transaction-detail-view.html',
})
export class TransactionDetailView {
  readonly transaction = input.required<TransactionDetail>();

  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(
    () => FLOW_TYPE_DISPLAY[this.transaction().category.flowType],
  );
}

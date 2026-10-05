import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { Calendar } from '@primeicons/angular/calendar';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { TransactionDetail } from '@transactions/models/transaction-detail';

@Component({
  imports: [Calendar, CurrencyPipe, DatePipe, PIcon, TagModule],
  selector: 'app-transaction-detail-view',
  templateUrl: './transaction-detail-view.html',
})
export class TransactionDetailView {
  readonly transaction = input.required<TransactionDetail>();

  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(
    () => FLOW_TYPE_DISPLAY[this.transaction().category.flowType],
  );

  protected readonly currentYear = computed(() => new Date().getFullYear());

  protected readonly formDate = (date: Date | string): string => {
    const d = new Date(date);
    const isCurrentYear = d.getFullYear() === this.currentYear();

    if (isCurrentYear) {
      return "EEEE d 'de' MMMM 'a las' HH:mm";
    }
    return "d 'de' MMMM 'de' yyyy 'a las' HH:mm";
  };
}

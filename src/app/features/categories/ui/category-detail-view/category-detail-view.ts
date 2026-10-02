import { DatePipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
// import { ArrowDownLeft } from '@primeicons/angular/arrow-down-left';
// import { ArrowUpRight } from '@primeicons/angular/arrow-up-right';
import { Calendar } from '@primeicons/angular/calendar';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { CategoryDetail } from '@shared/category/models/category-detail';
import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';

@Component({
  imports: [Calendar, DatePipe, PIcon, TagModule],
  selector: 'app-category-detail-view',
  templateUrl: './category-detail-view.html',
})
export class CategoryDetailView {
  readonly category = input.required<CategoryDetail>();

  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(() => FLOW_TYPE_DISPLAY[this.category().flowType]);

  protected readonly currentYear = computed(() => new Date().getFullYear());

  protected readonly formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const isCurrentYear = d.getFullYear() === this.currentYear();

    if (isCurrentYear) {
      return "EEEE d 'de' MMMM 'a las' HH:mm";
    }
    return "d 'de' MMMM 'de' yyyy 'a las' HH:mm";
  };
}

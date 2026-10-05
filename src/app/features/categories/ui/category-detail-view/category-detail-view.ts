import { Component, input, linkedSignal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { TagModule } from 'primeng/tag';

import { CategoryDetail } from '@shared/category/models/category-detail';
import { FLOW_TYPE_DISPLAY, FlowTypeDisplay } from '@shared/models/flow-type';
import { AuditDates } from '@shared/ui/audit-dates/audit-dates';

@Component({
  imports: [PIcon, TagModule, AuditDates],
  selector: 'app-category-detail-view',
  templateUrl: './category-detail-view.html',
})
export class CategoryDetailView {
  readonly category = input.required<CategoryDetail>();

  protected readonly flowTypeDisplay = linkedSignal<FlowTypeDisplay>(() => FLOW_TYPE_DISPLAY[this.category().flowType]);
}

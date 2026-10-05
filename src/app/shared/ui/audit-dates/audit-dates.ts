import { Component, input } from '@angular/core';
import { Calendar } from '@primeicons/angular/calendar';

import { SmartDatePipe } from '@shared/pipes/smart-date.pipe';

@Component({
  imports: [Calendar, SmartDatePipe],
  selector: 'app-audit-dates',
  templateUrl: './audit-dates.html',
})
export class AuditDates {
  readonly createdAt = input.required<Date | string>();
  readonly updatedAt = input.required<Date | string>();
}

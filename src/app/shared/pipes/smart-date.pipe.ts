import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate',
})
export class SmartDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: Date | string): string {
    const date = new Date(value);
    const isCurrentYear = date.getFullYear() === new Date().getFullYear();
    const pattern = isCurrentYear ? "EEEE d 'de' MMMM 'a las' HH:mm" : "d 'de' MMMM 'de' yyyy 'a las' HH:mm";

    return formatDate(date, pattern, this.locale);
  }
}

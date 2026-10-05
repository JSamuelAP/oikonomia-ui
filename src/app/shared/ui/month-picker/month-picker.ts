import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft } from '@primeicons/angular/arrow-left';
import { ArrowRight } from '@primeicons/angular/arrow-right';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

@Component({
  imports: [ArrowLeft, ArrowRight, ButtonModule, FormsModule, DatePickerModule],
  selector: 'app-month-picker',
  templateUrl: './month-picker.html',
})
export class MonthPicker {
  readonly selectedDate = model<Date>(startOfCurrentMonth());

  protected readonly minDate = new Date(2025, 0, 1);
  protected readonly maxDate = new Date(2100, 11, 31);

  protected navigateMonth(direction: 'prev' | 'next'): void {
    const current = this.selectedDate();
    const delta = direction === 'prev' ? -1 : 1;
    this.selectedDate.set(new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  protected isPrevDisabled(): boolean {
    return this.toMonthIndex(this.selectedDate()) <= this.toMonthIndex(this.minDate);
  }

  protected isNextDisabled(): boolean {
    return this.toMonthIndex(this.selectedDate()) >= this.toMonthIndex(this.maxDate);
  }

  private toMonthIndex(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth();
  }
}

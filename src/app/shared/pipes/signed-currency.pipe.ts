import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { FlowType } from '@shared/models/flow-type';

@Pipe({
  name: 'signedCurrency',
})
export class SignedCurrencyPipe implements PipeTransform {
  private readonly formatter = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'currency',
    currency: inject(DEFAULT_CURRENCY_CODE),
    signDisplay: 'exceptZero',
  });

  transform(value: number, flowType?: FlowType): string {
    return this.formatter.format(flowType === 'EXPENSE' ? -value : value);
  }
}

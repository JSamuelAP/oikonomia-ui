import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { MonthlyBalance } from './models/monthly-balance';

export function injectMonthlyBalance(month: () => Date, load: (month: Date) => Observable<MonthlyBalance>) {
  return rxResource({
    params: month,
    stream: ({ params }) => load(params),
  });
}

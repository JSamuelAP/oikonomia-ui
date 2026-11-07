import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export function injectMonthlyBalance<T>(month: () => Date, load: (month: Date) => Observable<T>) {
  return rxResource({
    params: month,
    stream: ({ params }) => load(params),
  });
}

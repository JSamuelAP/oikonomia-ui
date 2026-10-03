import { inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { TransactionApiService } from './transaction-api.service';

@Service()
export class TransactionStore {
  private readonly transactionApi = inject(TransactionApiService);

  readonly transactions = rxResource({
    stream: () => this.transactionApi.getAll(),
    defaultValue: [],
  });
}

import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { unexpectedError } from '@core/http/http-errors';

import { CreateTransactionRequest } from './models/create-transaction-request';
import { UpdateTransactionRequest } from './models/update-transaction-request';
import { TransactionApiService } from './transaction-api.service';

@Service()
export class TransactionFacade {
  private readonly transactionApi = inject(TransactionApiService);

  async create(data: CreateTransactionRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.transactionApi.create(data));
      return;
    } catch (error) {
      return unexpectedError(error);
    }
  }

  async update(id: string, data: UpdateTransactionRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.transactionApi.update(id, data));
      return;
    } catch (error) {
      return unexpectedError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await firstValueFrom(this.transactionApi.delete(id));
      return true;
    } catch (error) {
      console.error('Delete transaction failed:', error);
      return false;
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { BudgetApiService } from './budget-api.service';
import { CreateBudgetRequest } from './models/create-budget-request';

@Service()
export class BudgetFacade {
  private readonly busgetApi = inject(BudgetApiService);

  async create(data: CreateBudgetRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.busgetApi.create(data));
      return;
    } catch (error) {
      let message = 'Ocurrió un error, intenta de nuevo';
      if (error instanceof HttpErrorResponse) {
        message = error.error?.detail || message;
      }
      return { kind: 'unknown', message };
    }
  }
}

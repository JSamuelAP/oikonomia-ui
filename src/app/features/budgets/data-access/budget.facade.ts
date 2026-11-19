import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { unexpectedError } from '@core/http/http-errors';

import { BudgetApiService } from './budget-api.service';
import { CreateBudgetRequest } from './models/create-budget-request';
import { UpdateBudgetRequest } from './models/update-budget-request';

@Service()
export class BudgetFacade {
  private readonly budgetApi = inject(BudgetApiService);

  async create(data: CreateBudgetRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.budgetApi.create(data));
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return {
          kind: 'budgetAlreadyExists',
          message: error.error?.detail ?? 'Ya existe un presupuesto para ese mes y categoría',
        };
      }
      return unexpectedError(error);
    }
  }

  async update(id: string, data: UpdateBudgetRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.budgetApi.update(id, data));
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return {
          kind: 'budgetAlreadyExists',
          message: error.error?.detail ?? 'Ya existe un presupuesto para ese mes y categoría',
        };
      }
      return unexpectedError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await firstValueFrom(this.budgetApi.delete(id));
      return true;
    } catch (error) {
      console.error('Delete budget failed:', error);
      return false;
    }
  }
}

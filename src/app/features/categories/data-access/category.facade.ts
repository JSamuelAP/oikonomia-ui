import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { CategoryStore } from '@shared/category/category.store';

import { CategoryCommandApiService } from './category-command-api.service';
import { CreateCategoryRequest } from './models/create-category-request';

@Service()
export class CategoryFacade {
  private readonly commandApi = inject(CategoryCommandApiService);
  private readonly store = inject(CategoryStore);

  async create(data: CreateCategoryRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.commandApi.create(data));
      this.store.categories.reload();
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return {
          kind: 'categoryAlreadyExists',
          message: error.error?.detail ?? 'Ya existe una categoría con ese nombre y tipo',
        };
      }
      return { kind: 'unknown', message: 'Ocurrió un error, intenta de nuevo' };
    }
  }

  async update(id: string, data: CreateCategoryRequest): Promise<ValidationError | void> {
    try {
      await firstValueFrom(this.commandApi.update(id, data));
      this.store.categories.reload();
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return {
          kind: 'categoryAlreadyExists',
          message: error.error?.detail ?? 'Ya existe una categoría con ese nombre y tipo',
        };
      }
      return { kind: 'unknown', message: 'Ocurrió un error, intenta de nuevo' };
    }
  }
}

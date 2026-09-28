import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { CreateCategoryRequest } from './models/create-category-request';

@Service()
export class CategoryCommandApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/categories`;

  create(request: CreateCategoryRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, request);
  }
}

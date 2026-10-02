import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { Category } from './models/category';
import { CategoryDetail } from './models/category-detail';

@Service()
export class CategoryApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/categories`;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getById(id: string): Observable<CategoryDetail> {
    return this.http.get<CategoryDetail>(`${this.baseUrl}/${id}`);
  }
}

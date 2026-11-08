import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { formatYearMonth } from '@shared/util/date';
import { MonthlyBudgetBalance } from '@budgets/models/monthly-budget-balance';

import { MonthlyBudget } from '../models/monthly-budget';
import { MonthlyBudgetDetail } from '../models/monthly-budget-detail';
import { CreateBudgetRequest } from './models/create-budget-request';

@Service()
export class BudgetApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/monthly-budgets`;

  getAll(date: Date): Observable<MonthlyBudget[]> {
    return this.http.get<MonthlyBudget[]>(this.baseUrl, { params: { yearMonth: formatYearMonth(date) } });
  }

  getById(id: string): Observable<MonthlyBudgetDetail> {
    return this.http.get<MonthlyBudgetDetail>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateBudgetRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, request);
  }

  getBalance(date: Date): Observable<MonthlyBudgetBalance> {
    return this.http.get<MonthlyBudgetBalance>(`${this.baseUrl}/balance`, { params: { month: formatYearMonth(date) } });
  }
}

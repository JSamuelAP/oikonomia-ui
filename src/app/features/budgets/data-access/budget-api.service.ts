import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { MonthlyBalance } from '@shared/balance/models/monthly-balance';
import { formatYearMonth } from '@shared/util/date';

import { MonthlyBudget } from '../models/monthly-budget';
import { MonthlyBudgetDetail } from '../models/monthly-budget-detail';

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

  getBalance(date: Date): Observable<MonthlyBalance> {
    return this.http.get<MonthlyBalance>(`${this.baseUrl}/balance`, { params: { month: formatYearMonth(date) } });
  }
}

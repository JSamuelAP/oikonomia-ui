import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Transaction } from '@transactions/models/transaction';
import { TransactionDetail } from '@transactions/models/transaction-detail';

@Service()
export class TransactionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/transactions`;

  getAll(month: Date): Observable<Transaction[]> {
    const year = month.getFullYear();
    const formattedMonth = (month.getMonth() + 1).toString().padStart(2, '0');
    return this.http.get<Transaction[]>(`${this.baseUrl}?yearMonth=${year}-${formattedMonth}`);
  }

  getById(id: string): Observable<TransactionDetail> {
    return this.http.get<TransactionDetail>(`${this.baseUrl}/${id}`);
  }
}

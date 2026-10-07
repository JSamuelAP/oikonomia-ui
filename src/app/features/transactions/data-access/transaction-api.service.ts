import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { formatYearMonth } from '@shared/util/date';
import { Transaction } from '@transactions/models/transaction';
import { TransactionDetail } from '@transactions/models/transaction-detail';

import { CreateTransactionRequest } from './models/create-transaction-request';
import { UpdateTransactionRequest } from './models/update-transaction-request';

@Service()
export class TransactionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/transactions`;

  getAll(date: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}?yearMonth=${formatYearMonth(date)}`);
  }

  getById(id: string): Observable<TransactionDetail> {
    return this.http.get<TransactionDetail>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateTransactionRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, request);
  }

  update(id: string, request: UpdateTransactionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }
}

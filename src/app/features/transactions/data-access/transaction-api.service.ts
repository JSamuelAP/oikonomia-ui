import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { Transaction } from '@transactions/models/transaction';

@Service()
export class TransactionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/transactions`;

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}?yearMonth=${2026}-${10}`);
  }
}

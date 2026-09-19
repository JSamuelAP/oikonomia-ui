import { inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { TokenRefreshService } from './token-refresh.service';

export function initAuthSession(): Observable<string | null> {
  const tokenRefresh = inject(TokenRefreshService);
  return tokenRefresh.refreshAccessToken().pipe(catchError(() => of(null)));
}

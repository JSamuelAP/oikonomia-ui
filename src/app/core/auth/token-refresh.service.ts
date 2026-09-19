import { inject, Service } from '@angular/core';
import { catchError, finalize, map, Observable, share, throwError } from 'rxjs';

import { AuthApiService } from './auth-api.service';
import { AuthSessionService } from './auth-session.service';

@Service()
export class TokenRefreshService {
  private readonly authApi = inject(AuthApiService);
  private readonly session = inject(AuthSessionService);

  // para evitar refrescar más de una vez al mismo tiempo
  private refresh$: Observable<string> | null = null;

  refreshAccessToken(): Observable<string> {
    if (!this.refresh$) {
      this.refresh$ = this.authApi.refresh().pipe(
        map(({ accessToken }) => {
          this.session.setAccessToken(accessToken);
          return accessToken;
        }),
        catchError((error) => {
          this.session.clear();
          return throwError(() => error);
        }),
        finalize(() => {
          this.refresh$ = null;
        }),
        share(), // para que todos los sucriptores compartan la misma ejecución
      );
    }
    return this.refresh$;
  }
}

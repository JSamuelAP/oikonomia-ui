import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthSessionService } from './auth-session.service';
import { SKIP_AUTH } from './skip-auth-context';
import { TokenRefreshService } from './token-refresh.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const session = inject(AuthSessionService);
  const tokenRefresh = inject(TokenRefreshService);

  const attach = (token: string) =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  const authReq = session.accessToken ? attach(session.accessToken) : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Si se vence el token, refresca y vuelve a intentar solo una vez más la petición con el nuevo token
        return tokenRefresh.refreshAccessToken().pipe(switchMap((newToken) => next(attach(newToken))));
      }
      return throwError(() => error);
    }),
  );
};

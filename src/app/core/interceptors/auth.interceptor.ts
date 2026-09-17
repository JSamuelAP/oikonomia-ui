import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionService } from '@core/auth/auth-session.service';
import { SKIP_AUTH } from '@core/auth/skip-auth-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const accessToken = inject(AuthSessionService).accessToken;

  if (!accessToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authrorization: `Bearer ${accessToken}`,
    },
  });

  return next(authReq);
};

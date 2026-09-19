import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthSessionService } from './auth-session.service';

export const guestGuard: CanActivateChildFn = () => {
  const session = inject(AuthSessionService);
  const router = inject(Router);

  if (!session.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};

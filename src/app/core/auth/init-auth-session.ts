import { inject } from '@angular/core';

import { AuthFacade } from './auth.facade';

export function initAuthSession() {
  const authFacade = inject(AuthFacade);
  return authFacade.restoreSession();
}

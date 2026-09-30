import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { authInterceptor } from '@core/auth/auth.interceptor';
import { initAuthSession } from '@core/auth/init-auth-session';
import { AppTheme } from '@core/theme/app-theme';
import { environment } from '@environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initAuthSession),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    MessageService,
    providePrimeNG({
      theme: {
        preset: AppTheme,
        options: {
          darkModeSelector: false,
        },
      },
      license: environment.primeUiLicense,
    }),
  ],
};

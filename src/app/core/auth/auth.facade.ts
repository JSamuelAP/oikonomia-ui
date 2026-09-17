import { inject, Service } from '@angular/core';
import { AuthApiService } from '@auth/data-access/auth-api.service';
import { AuthSessionService } from './auth-session.service';
import { LoginCredentials } from '@auth/data-access/models/login-credentials';
import { ValidationError } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';

@Service()
export class AuthFacade {
  private readonly authApi = inject(AuthApiService);
  private readonly session = inject(AuthSessionService);

  async login(credentials: LoginCredentials): Promise<ValidationError | void> {
    try {
      const { accessToken } = await this.authApi.login(credentials);
      this.session.setAccessToken(accessToken);
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return { kind: 'invalidCredentials', message: 'Correo o contraseña incorrectos' };
      }
      return { kind: 'unknown', message: 'Ocurrió un error, intenta de nuevo' };
    }
  }
}

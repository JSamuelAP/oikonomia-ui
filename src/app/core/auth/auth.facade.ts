import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { AuthApiService } from './auth-api.service';
import { AuthSessionService } from './auth-session.service';
import { LoginCredentials } from './models/login-credentials';
import { SignupErrorKind, SignupRequest } from './models/signup-request';

@Service()
export class AuthFacade {
  private readonly authApi = inject(AuthApiService);
  private readonly session = inject(AuthSessionService);

  async login(credentials: LoginCredentials): Promise<ValidationError | void> {
    try {
      const { accessToken } = await firstValueFrom(this.authApi.login(credentials));
      this.session.setAccessToken(accessToken);
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return { kind: 'invalidCredentials', message: 'Correo o contraseña incorrectos' };
      }
      return { kind: 'unknown', message: 'Ocurrió un error, intenta de nuevo' };
    }
  }

  async signup(data: SignupRequest): Promise<ValidationError | void> {
    try {
      await this.authApi.signup(data);
      return;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        return {
          kind: 'emailAlreadyExists' satisfies SignupErrorKind,
          message: 'Ya existe una cuenta con este correo',
        };
      }
      return { kind: 'unknown' satisfies SignupErrorKind, message: 'Ocurrió un error, intenta de nuevo' };
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.authApi.logout());
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.session.clear();
    }
  }
}

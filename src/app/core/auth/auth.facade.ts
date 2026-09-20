import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { CurrentUserService } from '@core/user/current-user.service';
import { UserApiService } from '@core/user/user-api.service';

import { AuthApiService } from './auth-api.service';
import { AuthSessionService } from './auth-session.service';
import { LoginCredentials } from './models/login-credentials';
import { SignupErrorKind, SignupRequest } from './models/signup-request';
import { TokenRefreshService } from './token-refresh.service';

@Service()
export class AuthFacade {
  private readonly authApi = inject(AuthApiService);
  private readonly session = inject(AuthSessionService);
  private readonly tokenRefresh = inject(TokenRefreshService);
  private readonly userApi = inject(UserApiService);
  private readonly currentUser = inject(CurrentUserService);

  async login(credentials: LoginCredentials): Promise<ValidationError | void> {
    try {
      const { accessToken } = await firstValueFrom(this.authApi.login(credentials));
      this.session.setAccessToken(accessToken);
      await this.loadCurrentUser();
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

  async restoreSession(): Promise<void> {
    try {
      await firstValueFrom(this.tokenRefresh.refreshAccessToken());
      await this.loadCurrentUser();
    } catch (error) {
      console.error('Restore session failed:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.authApi.logout());
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.session.clear();
      this.currentUser.clear();
    }
  }

  private async loadCurrentUser(): Promise<void> {
    const user = await firstValueFrom(this.userApi.getCurrentUser());
    this.currentUser.set(user);
  }
}

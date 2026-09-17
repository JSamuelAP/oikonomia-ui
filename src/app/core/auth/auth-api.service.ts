import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '@environments/environment';

import { AuthResponse } from './models/auth-response';
import { LoginCredentials } from './models/login-credentials';
import { SignupRequest } from './models/signup-request';
import { SKIP_AUTH } from './skip-auth-context';

@Service()
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/auth`;

  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return firstValueFrom(
      this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials, {
        withCredentials: true,
        context: new HttpContext().set(SKIP_AUTH, true),
      }),
    );
  }

  signup(data: SignupRequest): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.baseUrl}/signup`, data, {
        context: new HttpContext().set(SKIP_AUTH, true),
      }),
    );
  }
}

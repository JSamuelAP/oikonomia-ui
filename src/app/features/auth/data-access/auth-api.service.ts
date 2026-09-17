import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '@environments/environment';
import { LoginCredentials } from './models/login-credentials';
import { AuthResponse } from './models/auth-response';
import { firstValueFrom } from 'rxjs';
import { SKIP_AUTH } from '@core/auth/skip-auth-context';

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
}

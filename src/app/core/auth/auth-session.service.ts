import { computed, Service, signal } from '@angular/core';

@Service()
export class AuthSessionService {
  private readonly accessTokenSignal = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.accessTokenSignal() !== null);

  get accessToken(): string | null {
    return this.accessTokenSignal();
  }

  setAccessToken(token: string) {
    this.accessTokenSignal.set(token);
  }

  clear(): void {
    this.accessTokenSignal.set(null);
  }
}

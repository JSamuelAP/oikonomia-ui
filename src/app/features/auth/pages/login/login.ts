import { Component, inject } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { AuthFacade } from '@core/auth/auth.facade';
import { LoginCredentials } from '@core/auth/models/login-credentials';
import { LoginForm } from '@auth/ui/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  protected readonly handleLogin = async (credentials: LoginCredentials): Promise<ValidationError | void> => {
    const error = await this.authFacade.login(credentials);
    if (error) return error;

    await this.router.navigateByUrl('/');
  };
}

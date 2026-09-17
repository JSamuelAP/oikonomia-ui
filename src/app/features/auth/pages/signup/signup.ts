import { Component, inject } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthFacade } from '@core/auth/auth.facade';
import { SignupRequest } from '@core/auth/models/signup-request';
import { SignupForm } from '@auth/ui/signup-form/signup-form';

@Component({
  imports: [RouterLink, SignupForm],
  selector: 'app-signup',
  templateUrl: './signup.html',
})
export class Signup {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  protected readonly handleSignup = async (data: SignupRequest): Promise<ValidationError | void> => {
    const error = await this.authFacade.signup(data);
    if (error) return error;

    this.messageService.add({
      severity: 'success',
      summary: 'Cuenta creada',
      detail: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
      life: 5000,
    });

    await this.router.navigateByUrl('/login');
  };
}

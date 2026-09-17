import { Component, input, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputPasswordModule } from 'primeng/inputpassword';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { email, form, FormField, FormRoot, maxLength, required, ValidationError } from '@angular/forms/signals';
import { MessageModule } from 'primeng/message';
import { LoginCredentials } from '@auth/data-access/models/login-credentials';

@Component({
  imports: [InputTextModule, InputPasswordModule, ButtonModule, FloatLabelModule, FormField, FormRoot, MessageModule],
  selector: 'app-login-form',
  templateUrl: './login-form.html',
})
export class LoginForm {
  readonly onSubmit =
    input.required<(credentials: LoginCredentials) => Promise<ValidationError | ValidationError[] | void>>();

  private loginModel = signal({ email: '', password: '' });

  protected loginForm = form(
    this.loginModel,
    (path) => {
      required(path.email, { when: ({ state }) => state.touched(), message: 'Correo electrónico requerido.' });
      email(path.email, { message: 'Correo electrónico inválido.' });
      maxLength(path.email, 320);

      required(path.password, { when: ({ state }) => state.touched(), message: 'Contraseña requerida.' });
      maxLength(path.password, 255);
    },
    {
      submission: {
        action: async (field) => this.onSubmit()(field().value()),
      },
    },
  );
}

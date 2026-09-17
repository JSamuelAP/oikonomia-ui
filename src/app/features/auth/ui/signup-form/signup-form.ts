import { Component, input, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
  ValidationError,
} from '@angular/forms/signals';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';

import { SignupRequest } from '@core/auth/models/signup-request';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '@auth/utils/password-policy';

import { PasswordRequirements } from '../password-requirements/password-requirements';

@Component({
  imports: [
    ButtonModule,
    Eye,
    EyeSlash,
    FloatLabelModule,
    FormField,
    FormRoot,
    IconFieldModule,
    InputIconModule,
    InputPasswordModule,
    InputTextModule,
    MessageModule,
    PopoverModule,
    PasswordRequirements,
  ],
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
})
export class SignupForm {
  readonly onSubmit = input.required<(data: SignupRequest) => Promise<ValidationError | void>>();

  private signupModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly passwordMask = signal(true);
  protected readonly confirmMask = signal(true);

  protected signupForm = form(
    this.signupModel,
    (path) => {
      required(path.firstName, { when: ({ state }) => state.touched(), message: 'Nombre requerido.' });
      minLength(path.firstName, 2, { message: 'Mínimo 2 caracteres.' });
      maxLength(path.firstName, 100);

      required(path.lastName, { when: ({ state }) => state.touched(), message: 'Apellidos requeridos.' });
      minLength(path.lastName, 2, { message: 'Mínimo 2 caracteres.' });
      maxLength(path.lastName, 150);

      required(path.email, { when: ({ state }) => state.touched(), message: 'Correo electrónico requerido.' });
      email(path.email, { message: 'Correo electrónico inválido.' });
      maxLength(path.email, 320);

      required(path.password, { when: ({ state }) => state.touched(), message: 'Contraseña requerida.' });
      minLength(path.password, PASSWORD_MIN_LENGTH, {
        message: `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`,
      });
      maxLength(path.password, PASSWORD_MAX_LENGTH);
      pattern(path.password, PASSWORD_PATTERN, { message: 'No cumple con los requisitos de seguridad.' });

      required(path.confirmPassword, {
        when: ({ state }) => state.touched(),
        message: 'Confirmar contraseña requerida.',
      });
      validate(path.confirmPassword, ({ value, valueOf }) => {
        const confirmPassword = value();
        const password = valueOf(path.password);
        if (confirmPassword && password && confirmPassword !== password) {
          return { kind: 'passwordMismatch', message: 'Las contraseñas no coinciden.' };
        }
        return null;
      });
    },
    {
      submission: {
        action: async (field) => {
          const { confirmPassword, ...credentials } = field().value();
          const error = await this.onSubmit()(credentials);
          if (!error) return;
          if (error.kind === 'emailAlreadyExists') {
            return { ...error, fieldTree: field.email };
          }
          return error;
        },
      },
    },
  );
}

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;

export const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

export interface PasswordRequeriment {
  readonly id: string;
  readonly label: string;
  readonly test: (value: string) => boolean;
  readonly weight: number;
}

export const PASSWORD_REQUERIMENTS: readonly PasswordRequeriment[] = [
  {
    id: 'length',
    label: `Mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
    test: (v: string) => v.length >= PASSWORD_MIN_LENGTH,
    weight: 20,
  },
  { id: 'uppercase', label: 'Al menos una mayúscula', test: (v: string) => /[A-Z]/.test(v), weight: 20 },
  { id: 'lowercase', label: 'Al menos una minúscula', test: (v: string) => /[a-z]/.test(v), weight: 20 },
  { id: 'number', label: 'Al menos un dígito', test: (v: string) => /[0-9]/.test(v), weight: 20 },
  {
    id: 'special',
    label: 'Al menos un carácter especial (@#$%^&+=)',
    test: (v: string) => /[@#$%^&+=]/.test(v),
    weight: 20,
  },
];

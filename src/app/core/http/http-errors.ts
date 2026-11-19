import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '@angular/forms/signals';

export function retryAfterSeconds(error: HttpErrorResponse): number | null {
  const header = error.headers.get('Retry-After');
  if (!header) return null;

  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(Math.ceil(seconds), 1);

  // En caso de que sea una fecha
  const date = Date.parse(header);
  return Number.isNaN(date) ? null : Math.max(Math.ceil((date - Date.now()) / 1000), 1);
}

export function unexpectedError(error: unknown): ValidationError {
  if (error instanceof HttpErrorResponse && error.status === 429) {
    const seconds = retryAfterSeconds(error);
    return {
      kind: 'rateLimited',
      message:
        seconds === null
          ? 'Demasiados intentos. Espere un momento e inténtelo de nuevo.'
          : `Demasiados intentos. Inténtelo de nuevo en ${formatWait(seconds)}.`,
    };
  }
  return { kind: 'unknown', message: 'Ocurrió un error, intenta de nuevo' };
}

function formatWait(seconds: number): string {
  if (seconds < 60) return seconds === 1 ? '1 segundo' : `${seconds} segundos`;
  const minutes = Math.ceil(seconds / 60);
  return minutes === 1 ? '1 minuto' : `${minutes} minutos`;
}

import { SchemaPath, validate } from '@angular/forms/signals';

export function notBlank(path: SchemaPath<string>, message = 'Este campo es obligatorio'): void {
  validate(path, ({ value }) => {
    const current = value();
    return current.length > 0 && current.trim().length === 0 ? { kind: 'blank', message } : null;
  });
}

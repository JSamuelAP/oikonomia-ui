import { Directive, input } from '@angular/core';

@Directive({ selector: '[ng-template[appTypedRow]]' })
export class TypedRow<T> {
  readonly appTypedRow = input.required<readonly T[] | null | undefined>();

  static ngTemplateContextGuard<T>(_: TypedRow<T>, _ctx: unknown): _ctx is { $implicit: T } {
    return true;
  }
}

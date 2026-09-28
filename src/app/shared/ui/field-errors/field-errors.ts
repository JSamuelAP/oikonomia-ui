import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MessageModule } from 'primeng/message';

@Component({
  imports: [MessageModule],
  selector: 'app-field-errors',
  templateUrl: './field-errors.html',
})
export class FieldErrors<T> {
  readonly field = input.required<FieldTree<T>>();
}

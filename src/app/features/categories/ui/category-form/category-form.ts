import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, maxLength, minLength, required, ValidationError } from '@angular/forms/signals';
import { Spinner } from '@primeicons/angular/spinner';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { FLOW_TYPE_DISPLAY, FlowType } from '@shared/models/flow-type';
import { FieldErrors } from '@shared/ui/field-errors/field-errors';
import { CreateCategoryRequest } from '@categories/data-access/models/create-category-request';
import { CategoryFormValue } from '@categories/models/category-form-value';

@Component({
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormField,
    FormRoot,
    InputTextModule,
    SelectButtonModule,
    Spinner,
    FieldErrors,
  ],
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  readonly initialValue = input<CategoryFormValue>();
  readonly onSubmit =
    input.required<(data: CreateCategoryRequest) => Promise<ValidationError | ValidationError[] | void>>();
  readonly canceled = output<void>();

  protected readonly categoryModel = linkedSignal<CategoryFormValue>(
    () => this.initialValue() ?? { name: '', flowType: 'EXPENSE' },
  );
  protected flowTypeOptions = [
    {
      label: FLOW_TYPE_DISPLAY.INCOME.label,
      value: 'INCOME' satisfies FlowType,
      icon: FLOW_TYPE_DISPLAY.INCOME.iconClass,
    },
    {
      label: FLOW_TYPE_DISPLAY.EXPENSE.label,
      value: 'EXPENSE' satisfies FlowType,
      icon: FLOW_TYPE_DISPLAY.EXPENSE.iconClass,
    },
  ];

  private readonly NAME_MIN_LENGTH = 2;
  private readonly NAME_MAX_LENGTH = 50;

  protected categoryForm = form(
    this.categoryModel,
    (path) => {
      required(path.name, { when: ({ state }) => state.touched(), message: 'Nombre requerido.' });
      minLength(path.name, this.NAME_MIN_LENGTH, { message: `Mínimo ${this.NAME_MIN_LENGTH} caracteres.` });
      maxLength(path.name, this.NAME_MAX_LENGTH);

      required(path.flowType, { when: ({ state }) => state.touched(), message: 'Tipo de flujo requerido.' });
    },
    {
      submission: {
        action: async (field) => {
          const error = await this.onSubmit()(field().value());
          if (error) return error;
          field().reset(this.initialValue());
          return undefined;
        },
      },
    },
  );
}

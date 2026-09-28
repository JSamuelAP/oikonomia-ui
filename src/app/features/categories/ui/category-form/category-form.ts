import { Component, input, output, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, minLength, required, ValidationError } from '@angular/forms/signals';
import { Spinner } from '@primeicons/angular/spinner';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';

import { FlowType } from '@shared/models/flow-type';
import { CreateCategoryRequest } from '@categories/data-access/models/create-category-request';

@Component({
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormField,
    FormRoot,
    InputTextModule,
    MessageModule,
    SelectButtonModule,
    Spinner,
  ],
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  readonly onSubmit =
    input.required<(data: CreateCategoryRequest) => Promise<ValidationError | ValidationError[] | void>>();
  readonly canceled = output<void>();

  private readonly initialValue: CreateCategoryRequest = { name: '', flowType: 'INCOME' };
  private formModel = signal(this.initialValue);
  private readonly NAME_MIN_LENGTH = 2;
  private readonly NAME_MAX_LENGTH = 50;

  protected flowTypeOptions = [
    { label: 'Ingreso', value: 'INCOME' satisfies FlowType, icon: 'pi pi-arrow-down-left' },
    { label: 'Gasto', value: 'EXPENSE' satisfies FlowType, icon: 'pi pi-arrow-up-right' },
  ];

  protected categoryForm = form(
    this.formModel,
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
          field().reset(this.initialValue);
          return undefined;
        },
      },
    },
  );
}

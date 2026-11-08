import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, max, maxDate, min, required, ValidationError } from '@angular/forms/signals';
import { Spinner } from '@primeicons/angular/spinner';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';

import { Category } from '@shared/category/models/category';
import { CategorySelect } from '@shared/category/ui/category-select/category-select';
import { FieldErrors } from '@shared/ui/field-errors/field-errors';
import { startOfDay } from '@shared/util/date';
import { CreateBudgetRequest } from '@budgets/data-access/models/create-budget-request';
import { MonthlyBudget } from '@budgets/models/monthly-budget';

import { BudgetFormValue } from './budget-form-value';

@Component({
  imports: [
    AutoFocusModule,
    ButtonModule,
    CategorySelect,
    DatePickerModule,
    FieldErrors,
    FloatLabelModule,
    FormField,
    FormRoot,
    InputNumberModule,
    Spinner,
    TextareaModule,
  ],
  selector: 'app-budget-form',
  templateUrl: './budget-form.html',
})
export class BudgetForm {
  readonly initialValue = input<MonthlyBudget>();
  readonly categories = input.required<Category[]>();
  readonly onSubmit =
    input.required<(data: CreateBudgetRequest) => Promise<ValidationError | ValidationError[] | void>>();
  readonly canceled = output<void>();

  protected readonly budgetModel = linkedSignal<BudgetFormValue>(() => {
    const transaction = this.initialValue();
    return transaction ? this.toFormValue(transaction) : this.emptyFormValue();
  });

  private readonly AMOUNT_MIN = 0.01;
  private readonly AMOUNT_MAX = 9_999_999_999.99;
  protected readonly DATE_MAX = startOfDay();

  protected budgetForm = form(
    this.budgetModel,
    (path) => {
      required(path.month, { when: ({ state }) => state.touched(), message: 'Fecha requerida.' });
      maxDate(path.month, this.DATE_MAX, { message: 'No se permite meses futuros.' });

      required(path.expectedAmount, { when: ({ state }) => state.touched(), message: 'Cantidad requerida.' });
      min(path.expectedAmount, this.AMOUNT_MIN);
      max(path.expectedAmount, this.AMOUNT_MAX);

      required(path.categoryId, { when: ({ state }) => state.touched(), message: 'Categoría requerida.' });
    },
    {
      submission: {
        action: async (field) => {
          const data = {
            ...field().value(),
            month: field().value().month.getMonth() + 1,
            year: field().value().month.getFullYear(),
          };
          const error = await this.onSubmit()(data);
          if (error) return error;
          field().reset(this.emptyFormValue());
          return undefined;
        },
      },
    },
  );

  private toFormValue(budget: MonthlyBudget): BudgetFormValue {
    const { month, year, expectedAmount, category } = budget;
    return {
      month: new Date(year, month - 1, 1),
      expectedAmount,
      categoryId: category.id,
    };
  }

  private emptyFormValue(): BudgetFormValue {
    return { month: new Date(this.DATE_MAX), expectedAmount: 0.01, categoryId: '' };
  }
}

import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, max, maxDate, min, required, ValidationError } from '@angular/forms/signals';
import { PIcon } from '@primeicons/angular/p-icon';
import { Spinner } from '@primeicons/angular/spinner';
import { Tags } from '@primeicons/angular/tags';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { Category } from '@shared/category/models/category';
import { FLOW_TYPE_DISPLAY, FlowType } from '@shared/models/flow-type';
import { FieldErrors } from '@shared/ui/field-errors/field-errors';
import { startOfDay } from '@shared/util/date';
import { CreateBudgetRequest } from '@budgets/data-access/models/create-budget-request';
import { MonthlyBudget } from '@budgets/models/monthly-budget';

import { BudgetFormValue } from './budget-form-value';

@Component({
  imports: [
    AutoFocusModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    FormField,
    FormRoot,
    InputNumberModule,
    PIcon,
    SelectModule,
    Spinner,
    Tags,
    TextareaModule,
    FieldErrors,
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
  protected readonly groupedCategories = linkedSignal<SelectItemGroup[]>(() => [
    {
      label: FLOW_TYPE_DISPLAY.EXPENSE.title,
      items: this.toSelectItems(this.categories(), 'EXPENSE'),
    },
    {
      label: FLOW_TYPE_DISPLAY.INCOME.title,
      items: this.toSelectItems(this.categories(), 'INCOME'),
    },
  ]);

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
      month: new Date(year, month, 1),
      expectedAmount,
      categoryId: category.id,
    };
  }

  private emptyFormValue(): BudgetFormValue {
    return { month: new Date(this.DATE_MAX), expectedAmount: 0.01, categoryId: '' };
  }

  private toSelectItems(categories: Category[], flowType: FlowType): SelectItem<string>[] {
    return categories.filter((c) => c.flowType === flowType).map((c) => this.toSelectItem(c));
  }

  private toSelectItem(category: Category): SelectItem<string> {
    return {
      label: category.name,
      value: category.id,
      icon: FLOW_TYPE_DISPLAY[category.flowType].icon,
      styleClass: category.flowType === 'INCOME' ? 'p-green-700' : 'p-red-700',
    };
  }
}

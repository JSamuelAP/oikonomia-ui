import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, maxDate, maxLength, min, required, ValidationError } from '@angular/forms/signals';
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
import { CreateTransactionRequest } from '@transactions/data-access/models/create-transaction-request';
import { Transaction } from '@transactions/models/transaction';
import { TransactionFormValue } from '@transactions/ui/transaction-form/transaction-form-value';

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
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.html',
})
export class TransactionForm {
  readonly initialValue = input<Transaction>();
  readonly categories = input.required<Category[]>();
  readonly onSubmit =
    input.required<(data: CreateTransactionRequest) => Promise<ValidationError | ValidationError[] | void>>();
  readonly canceled = output<void>();

  protected readonly transactionModel = linkedSignal<TransactionFormValue>(() => {
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
  private readonly NOTES_MAX_LENGTH = 255;
  protected readonly DATE_MAX = startOfDay();

  protected transactionForm = form(
    this.transactionModel,
    (path) => {
      required(path.date, { when: ({ state }) => state.touched(), message: 'Fecha requerida.' });
      maxDate(path.date, this.DATE_MAX, { message: 'No se permite fecha futura.' });

      required(path.amount, { when: ({ state }) => state.touched(), message: 'Cantidad requerida.' });
      min(path.amount, this.AMOUNT_MIN);

      required(path.categoryId, { when: ({ state }) => state.touched(), message: 'Categoría requerida.' });

      maxLength(path.notes, this.NOTES_MAX_LENGTH);
    },
    {
      submission: {
        action: async (field) => {
          const error = await this.onSubmit()(field().value());
          if (error) return error;
          field().reset(this.emptyFormValue());
          return undefined;
        },
      },
    },
  );

  private toFormValue(transaction: Transaction): TransactionFormValue {
    const { date, amount, notes, category } = transaction;
    return {
      date: new Date(date),
      amount,
      categoryId: category.id,
      notes,
    };
  }

  private emptyFormValue(): TransactionFormValue {
    return { date: new Date(this.DATE_MAX), amount: 0.01, categoryId: '', notes: '' };
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

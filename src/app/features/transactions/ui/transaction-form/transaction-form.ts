import { Component, input, linkedSignal, output } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  max,
  maxDate,
  maxLength,
  min,
  required,
  ValidationError,
} from '@angular/forms/signals';
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
import { formatDateOnly, parseDateOnly, startOfDay } from '@shared/util/date';
import { CreateTransactionRequest } from '@transactions/data-access/models/create-transaction-request';
import { Transaction } from '@transactions/models/transaction';
import { TransactionFormValue } from '@transactions/ui/transaction-form/transaction-form-value';

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

  private readonly AMOUNT_MIN = 0.01;
  private readonly AMOUNT_MAX = 9_999_999_999.99;
  private readonly NOTES_MAX_LENGTH = 255;
  protected readonly DATE_MAX = startOfDay();

  protected transactionForm = form(
    this.transactionModel,
    (path) => {
      required(path.date, { when: ({ state }) => state.touched(), message: 'Fecha requerida.' });
      maxDate(path.date, this.DATE_MAX, { message: 'No se permite fecha futura.' });

      required(path.amount, { when: ({ state }) => state.touched(), message: 'Cantidad requerida.' });
      min(path.amount, this.AMOUNT_MIN);
      max(path.amount, this.AMOUNT_MAX);

      required(path.categoryId, { when: ({ state }) => state.touched(), message: 'Categoría requerida.' });

      maxLength(path.notes, this.NOTES_MAX_LENGTH);
    },
    {
      submission: {
        action: async (field) => {
          const data = { ...field().value(), date: formatDateOnly(field().value().date) };
          const error = await this.onSubmit()(data);
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
      date: parseDateOnly(date),
      amount,
      categoryId: category.id,
      notes,
    };
  }

  private emptyFormValue(): TransactionFormValue {
    return { date: new Date(this.DATE_MAX), amount: 0.01, categoryId: '', notes: '' };
  }
}

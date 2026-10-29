import { PercentPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { Wallet } from '@primeicons/angular/wallet';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';

import { MonthlyBalance } from '@shared/balance/models/monthly-balance';
import { FLOW_TYPE_DISPLAY } from '@shared/models/flow-type';
import { SignedCurrencyPipe } from '@shared/pipes/signed-currency.pipe';
import { StatCard } from '@shared/ui/stat-card/stat-card';

interface Change {
  readonly magnitude: number;
  readonly up: boolean;
  readonly good: boolean;
}

@Component({
  imports: [ButtonModule, Message, PercentPipe, PIcon, SignedCurrencyPipe, StatCard, Tag, Wallet],
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.html',
})
export class BalanceSummary {
  readonly balance = input<MonthlyBalance>();
  readonly previous = input<MonthlyBalance>();
  readonly loading = input(false);
  readonly error = input(false);
  readonly retry = output<void>();

  protected readonly income = FLOW_TYPE_DISPLAY.INCOME;
  protected readonly expense = FLOW_TYPE_DISPLAY.EXPENSE;

  protected readonly totals = computed(() => {
    const balance = this.balance();
    return {
      income: balance?.totalIncome ?? 0,
      expense: -(balance?.totalExpense ?? 0),
      net: balance?.balance ?? 0,
    };
  });

  protected readonly balanceSeverity = computed<'success' | 'danger' | 'neutral'>(() => {
    const net = this.totals().net;
    if (net > 0) return 'success';
    if (net < 0) return 'danger';
    return 'neutral';
  });

  protected readonly savingsRate = computed(() => {
    const balance = this.balance();
    if (!balance || balance.totalIncome <= 0) return null;

    const rate = balance.balance / balance.totalIncome;
    return balance.totalExpense > 0 ? Math.min(rate, 0.9999) : rate;
  });

  protected readonly incomeChange = computed(() => this.change('totalIncome', true));
  protected readonly expenseChange = computed(() => this.change('totalExpense', false));

  private change(key: 'totalIncome' | 'totalExpense', higherIsBetter: boolean): Change | null {
    const current = this.balance();
    const previous = this.previous();
    if (!current || !previous) return null;
    if (current.totalIncome === 0 && current.totalExpense === 0) return null;
    if (previous[key] <= 0) return null;

    const ratio = (current[key] - previous[key]) / previous[key];
    if (Math.abs(ratio) < 0.005) return null;
    const up = ratio > 0;
    return { magnitude: Math.abs(ratio), up, good: up === higherIsBetter };
  }
}

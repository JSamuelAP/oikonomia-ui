import { FlowType } from '@shared/models/flow-type';

export type BudgetStatus = 'ok' | 'warning' | 'over' | 'pending' | 'reached' | 'missed';
export type BudgetMessageKey =
  | 'ok'
  | 'ok-closed'
  | 'warning'
  | 'warning-closed'
  | 'exhausted'
  | 'over'
  | 'pending'
  | 'reached'
  | 'missed'
  | 'surpased';

interface StatusDisplay {
  readonly textClass: string;
  readonly icon: string | null;
  readonly badge: string | null;
  readonly srText: string | null;
  readonly barClass: string;
}

const WARNING_THRESHOLD = 0.8;

export function budgetStatus(
  flow: FlowType,
  expected: number,
  actual: number,
  remaining: number,
  monthClosed: boolean,
): BudgetStatus {
  if (flow === 'INCOME') {
    if (remaining <= 0) return 'reached';
    return monthClosed ? 'missed' : 'pending';
  }
  if (remaining < 0) return 'over';
  if (expected > 0 && actual / expected >= WARNING_THRESHOLD) return 'warning';
  return 'ok';
}

export function budgetMessageKey(status: BudgetStatus, remaining: number, monthClosed: boolean): BudgetMessageKey {
  switch (status) {
    case 'ok':
      return monthClosed ? 'ok-closed' : 'ok';
    case 'warning':
      if (remaining === 0) return 'exhausted';
      return monthClosed ? 'warning-closed' : 'warning';
    case 'reached':
      return remaining < 0 ? 'surpased' : 'reached';
    default:
      return status;
  }
}

export function displayedRemaining(flow: FlowType, remaining: number): number {
  return flow === 'INCOME' ? Math.max(remaining, 0) : remaining;
}

export const BUDGET_STATUS_DISPLAY: Record<BudgetStatus, StatusDisplay> = {
  ok: { textClass: 'text-color', icon: null, badge: null, srText: null, barClass: 'bg-primary' },
  warning: {
    textClass: 'text-amber-700',
    icon: 'exclamation-triangle',
    badge: null,
    srText: 'Límite cercano o alcanzado',
    barClass: 'bg-amber-700',
  },
  over: { textClass: 'text-red-900', icon: null, badge: 'Excedido', srText: null, barClass: 'bg-red-900' },
  pending: { textClass: 'text-color', icon: null, badge: null, srText: null, barClass: 'bg-primary' },
  reached: {
    textClass: 'text-green-900',
    icon: 'check-circle',
    badge: null,
    srText: 'Meta alcanzada',
    barClass: 'bg-green-900',
  },
  missed: {
    textClass: 'text-amber-700',
    icon: 'exclamation-triangle',
    badge: null,
    srText: 'Menos de lo esperado',
    barClass: 'bg-amber-700',
  },
};

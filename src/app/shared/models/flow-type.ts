export type FlowType = 'INCOME' | 'EXPENSE';

export interface FlowTypeDisplay {
  readonly title: string;
  readonly subtitle: string;
  readonly severity: 'success' | 'danger';
}

export const FLOW_TYPE_DISPLAY: Record<FlowType, FlowTypeDisplay> = {
  INCOME: { title: 'Ingresos', subtitle: 'Entradas de dinero', severity: 'success' },
  EXPENSE: { title: 'Gastos', subtitle: 'Salidas de dinero y ahorro', severity: 'danger' },
};

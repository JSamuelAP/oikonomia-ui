export type FlowType = 'INCOME' | 'EXPENSE';

export interface FlowTypeDisplay {
  readonly title: string;
  readonly subtitle: string;
  readonly label: string;
  readonly severity: 'success' | 'danger';
  readonly amountClass: string;
  readonly icon: string;
  readonly iconClass: string;
}

export const FLOW_TYPE_DISPLAY: Record<FlowType, FlowTypeDisplay> = {
  INCOME: {
    title: 'Ingresos',
    subtitle: 'Entradas de dinero',
    label: 'Ingreso',
    severity: 'success',
    amountClass: 'text-green-900',
    icon: 'arrow-down-left',
    iconClass: 'pi pi-arrow-down-left',
  },
  EXPENSE: {
    title: 'Gastos',
    subtitle: 'Salidas de dinero y ahorro',
    label: 'Gasto',
    severity: 'danger',
    amountClass: 'text-red-900',
    icon: 'arrow-up-right',
    iconClass: 'pi pi-arrow-up-right',
  },
};

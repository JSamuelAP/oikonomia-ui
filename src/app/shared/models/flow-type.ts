export type FlowType = 'INCOME' | 'EXPENSE';

export interface FlowTypeDisplay {
  readonly title: string;
  readonly subtitle: string;
  readonly label: string;
  readonly severity: 'success' | 'danger';
  readonly icon: string;
  readonly iconClass: string;
}

export const FLOW_TYPE_DISPLAY: Record<FlowType, FlowTypeDisplay> = {
  INCOME: {
    title: 'Ingresos',
    subtitle: 'Entradas de dinero',
    label: 'Ingreso',
    severity: 'success',
    icon: 'arrow-down-left',
    iconClass: 'pi pi-arrow-down-left',
  },
  EXPENSE: {
    title: 'Gastos',
    subtitle: 'Salidas de dinero y ahorro',
    label: 'Gasto',
    severity: 'danger',
    icon: 'arrow-up-right',
    iconClass: 'pi pi-arrow-up-right',
  },
};

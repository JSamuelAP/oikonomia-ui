export interface FlowTotals {
  expected: number;
  actual: number;
  remaining: number;
}

export interface MonthlyBudgetBalance {
  month: string;
  income: FlowTotals;
  expense: FlowTotals;
  expectedBalance: number;
  actualBalance: number;
}

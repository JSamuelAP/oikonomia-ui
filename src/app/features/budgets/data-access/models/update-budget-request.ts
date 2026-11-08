export interface UpdateBudgetRequest {
  month: number;
  year: number;
  expectedAmount: number;
  categoryId: string;
}

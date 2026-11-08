export interface CreateBudgetRequest {
  month: number;
  year: number;
  expectedAmount: number;
  categoryId: string;
}

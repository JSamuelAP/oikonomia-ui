export interface UpdateTransactionRequest {
  date: string;
  amount: number;
  categoryId: string;
  notes?: string;
}

export interface CreateTransactionRequest {
  date: Date;
  amount: number;
  categoryId: string;
  notes?: string;
}

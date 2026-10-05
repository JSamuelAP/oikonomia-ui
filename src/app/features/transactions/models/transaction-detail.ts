import { Transaction } from './transaction';

export interface TransactionDetail extends Transaction {
  createdAt: string;
  updatedAt: string;
}

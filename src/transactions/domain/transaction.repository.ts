import { Transaction } from "./transaction.entity";

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  save(transaction: Transaction): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
  getTransactionStatus(transactionId: string): Promise<string>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

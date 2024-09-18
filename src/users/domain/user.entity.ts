import { Transaction } from "src/transactions/domain/transaction.entity";

export class User {
  constructor(
    public readonly clerkUserId: string,
    public readonly email: string,
    public transactions: Transaction[]
  ) {}
}

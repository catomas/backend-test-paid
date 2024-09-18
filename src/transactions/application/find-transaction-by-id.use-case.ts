import { Inject, Injectable } from "@nestjs/common";
import { TransactionRepository } from "../domain/transaction.repository";
import { Transaction } from "../domain/transaction.entity";

@Injectable()
export class FindTransactionByIdUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }
}

import { Injectable, Inject } from "@nestjs/common";
import { TransactionRepository } from "../domain/transaction.repository";

@Injectable()
export class UpdateTransactionStatusUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(id: string, status: string): Promise<void> {
    await this.transactionRepository.updateStatus(id, status);
  }
}

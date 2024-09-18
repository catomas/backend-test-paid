import { Injectable, Inject } from "@nestjs/common";
import { TransactionRepository } from "../domain/transaction.repository";
import { WompiService } from "src/payments/wompi.service";

@Injectable()
export class GetTransactionStatusUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository,

    private readonly wompiService: WompiService
  ) {}

  async execute(transactionId: string) {
    // const transaction = await this.transactionRepository.findById(
    //   transactionId
    // );

    // if (!transaction) {
    //   return null;
    // }

    const status = await this.wompiService.getTransactionStatus(transactionId);

    await this.transactionRepository.updateStatus(transactionId, status);

    return status;
  }
}

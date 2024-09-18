// src/transactions/infrastructure/transaction.controller.ts
import { Controller, Post, Body, Patch, Param, Get } from "@nestjs/common";
import {
  CreditCardInfo,
  CustomerData,
} from "src/payments/interfaces/interface-transaction-use-case";
import { CreateTransactionUseCase } from "src/transactions/application/create-transaction.use-case";
import { FindTransactionByIdUseCase } from "src/transactions/application/find-transaction-by-id.use-case";
import { GetTransactionStatusUseCase } from "src/transactions/application/get-transaction-status.use-case";
import { UpdateTransactionStatusUseCase } from "src/transactions/application/update-transaction-status.use-case";
import { User } from "src/users/domain/user.entity";

@Controller("transactions")
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
    private readonly findTransactionByIdUseCase: FindTransactionByIdUseCase,
    private readonly getTransactionStatusUseCase: GetTransactionStatusUseCase
  ) {}

  @Post()
  async create(
    @Body()
    createTransactionDto: {
      userId: string;
      productId: string;
      quantity: number;
      cardInfo: CreditCardInfo;
      customerData: CustomerData;
    }
  ) {
    const transaction = await this.createTransactionUseCase.execute(
      createTransactionDto.userId,
      createTransactionDto.productId,
      createTransactionDto.quantity,
      createTransactionDto.cardInfo,
      createTransactionDto.customerData
    );
    return { transaction };
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: { status: string }
  ) {
    await this.updateTransactionStatusUseCase.execute(
      id,
      updateStatusDto.status
    );
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.findTransactionByIdUseCase.execute(id);
  }

  @Get(":id/status")
  async getStatus(@Param("id") id: string) {
    return this.getTransactionStatusUseCase.execute(id);
  }
}

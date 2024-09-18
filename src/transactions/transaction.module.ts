// src/transactions/transaction.module.ts
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "./infrastructure/entities/transaction.entity";
import { CreateTransactionUseCase } from "./application/create-transaction.use-case";
import { UpdateTransactionStatusUseCase } from "./application/update-transaction-status.use-case";
import { TypeOrmTransactionRepository } from "./infrastructure/adapters/typeorm-transaction.repository";
import { FindTransactionByIdUseCase } from "./application/find-transaction-by-id.use-case";
import { TransactionController } from "./infrastructure/controllers/transaction.controller";
import { ProductModule } from "src/products/product.module";
import { PaymentsModule } from "src/payments/payments.module";
import { GetTransactionStatusUseCase } from "./application/get-transaction-status.use-case";
import { UserModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    forwardRef(() => UserModule),
    ProductModule,
    PaymentsModule,
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: "TransactionRepository",
      useClass: TypeOrmTransactionRepository,
    },
    CreateTransactionUseCase,
    UpdateTransactionStatusUseCase,
    FindTransactionByIdUseCase,
    GetTransactionStatusUseCase,
  ],
  exports: ["TransactionRepository"],
})
export class TransactionModule {}

// src/transactions/infrastructure/typeorm-transaction.repository.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionRepository } from "src/transactions/domain/transaction.repository";
import { Transaction } from "src/transactions/domain/transaction.entity";

@Injectable()
export class TypeOrmTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>
  ) {}

  async findAll(): Promise<Transaction[]> {
    const entities = await this.repository.find({ relations: ["product"] });
    return entities.map(
      (entity) =>
        new Transaction(
          entity.id,
          entity.product,
          entity.quantity,
          entity.totalPrice,
          entity.createdAt,
          entity.status,
          entity.user
        )
    );
  }

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ["product"],
    });
    if (!entity) return null;
    return new Transaction(
      entity.id,
      entity.product,
      entity.quantity,
      entity.totalPrice,
      entity.createdAt,
      entity.status,
      entity.user
    );
  }

  async save(transaction: Transaction): Promise<void> {
    const entity = this.repository.create(transaction);
    await this.repository.save(entity);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.repository.update(id, { status });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getTransactionStatus(transactionId: string): Promise<string> {
    const entity = await this.repository.findOne({
      where: { id: transactionId },
    });
    return entity.status;
  }

  async clear(): Promise<void> {
    await this.repository.delete({});
  }
}

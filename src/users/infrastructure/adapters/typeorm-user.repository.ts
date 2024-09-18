import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/users/domain/user.repository";
import { UserEntity } from "../entities/user.entity";
import { User } from "src/users/domain/user.entity";
import { Repository } from "typeorm";
import { Transaction } from "src/transactions/domain/transaction.entity";

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async findByClerkUserId(clerkUserId: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { clerkUserId },
      relations: ["transactions", "transactions.product"],
    });

    if (!entity) {
      throw new NotFoundException(
        `User with clerkUserId ${clerkUserId} not found`
      );
    }

    console.log(entity.clerkUserId, clerkUserId);
    if (entity.clerkUserId !== clerkUserId) {
      throw new NotFoundException(
        `User with clerkUserId ${clerkUserId} not found`
      );
    }
    const transactions = entity.transactions?.map(
      (transaction) =>
        new Transaction(
          transaction.id,
          transaction.product,
          transaction.quantity,
          transaction.totalPrice,
          transaction.createdAt,
          transaction.status,
          null // No necesitamos el usuario aquí para evitar referencias circulares
        )
    );
    return new User(entity.clerkUserId, entity.email, transactions);
  }

  async save(user: User): Promise<User> {
    const entity = this.repository.create({
      ...user,
      transactions: user.transactions.map((transaction) => ({
        ...transaction,
        user: undefined, // Evitar referencias circulares
      })),
    });
    await this.repository.save(entity);
    const transactions = entity.transactions.map(
      (transaction) =>
        new Transaction(
          transaction.id,
          transaction.product,
          transaction.quantity,
          transaction.totalPrice,
          transaction.createdAt,
          transaction.status,
          null // No necesitamos el usuario aquí para evitar referencias circulares
        )
    );
    return new User(entity.clerkUserId, entity.email, transactions);
  }
}

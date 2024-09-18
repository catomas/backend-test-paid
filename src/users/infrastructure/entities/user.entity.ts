import { TransactionEntity } from "src/transactions/infrastructure/entities/transaction.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryColumn({ unique: true })
  clerkUserId: string;

  @Column()
  email: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];
}

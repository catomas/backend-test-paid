import { ProductEntity } from "src/products/infrastructure/entities/product.entity";
import { User } from "src/users/domain/user.entity";
import { UserEntity } from "src/users/infrastructure/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryColumn("text")
  id: string;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column("int")
  quantity: number;

  @Column("decimal")
  totalPrice: number;

  @Column("timestamp")
  createdAt: Date;

  @Column("text")
  status: string; // PENDING, COMPLETED, FAILED

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}

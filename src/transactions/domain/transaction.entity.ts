import { Product } from "src/products/domain/product.entity";
import { User } from "src/users/domain/user.entity";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly product: Product,
    public readonly quantity: number,
    public readonly totalPrice: number,
    public readonly createdAt: Date,
    public readonly status: string,
    public readonly user: User
  ) {}
}

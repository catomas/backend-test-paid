import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async execute(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number
  ): Promise<void> {
    const product = new Product(id, name, description, price, stock);
    await this.productRepository.save(product);
  }
}

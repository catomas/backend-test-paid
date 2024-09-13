import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async execute(
    name: string,
    description: string,
    price: number,
    stock: number
  ): Promise<void> {
    const product = new Product(uuidv4(), name, description, price, stock);
    await this.productRepository.save(product);
  }
}

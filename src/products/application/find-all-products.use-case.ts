import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}

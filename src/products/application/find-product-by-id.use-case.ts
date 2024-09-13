import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.entity";

@Injectable()
export class FindProductByIdUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}

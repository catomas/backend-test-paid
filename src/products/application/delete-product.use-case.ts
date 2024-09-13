import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/product.repository";

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}

// src/products/products.service.ts
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./infrastructure/dto/create-product.dto";
import { UpdateProductDto } from "./infrastructure/dto/update-product.dto";
import { CreateProductUseCase } from "./application/create-product.use-case";
import { FindAllProductsUseCase } from "./application/find-all-products.use-case";
import { DeleteProductUseCase } from "./application/delete-product.use-case";
import { FindProductByIdUseCase } from "./application/find-product-by-id.use-case";
import { UpdateProductUseCase } from "./application/update-product.use-case";

@Injectable()
export class ProductsService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, price, stock } = createProductDto;
    await this.createProductUseCase.execute(name, description, price, stock);
  }

  async findAll() {
    return this.findAllProductsUseCase.execute();
  }

  async findOne(id: string) {
    return this.findProductByIdUseCase.execute(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { name, description, price, stock } = updateProductDto;
    await this.updateProductUseCase.execute(
      id,
      name,
      description,
      price,
      stock
    );
  }

  async remove(id: string) {
    await this.deleteProductUseCase.execute(id);
  }
}

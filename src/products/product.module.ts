import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateProductUseCase } from "./application/create-product.use-case";
import { FindProductByIdUseCase } from "./application/find-product-by-id.use-case";
import { UpdateProductUseCase } from "./application/update-product.use-case";
import { DeleteProductUseCase } from "./application/delete-product.use-case";
import { ProductsService } from "./products.service";
import { ProductEntity } from "./infrastructure/entities/product.entity";
import { TypeOrmProductRepository } from "./infrastructure/adapters/typeorm-product.repository";
import { ProductController } from "./infrastructure/controllers/product.controller";
import { FindAllProductsUseCase } from "./application/find-all-products.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductsService,
    {
      provide: "ProductRepository",
      useClass: TypeOrmProductRepository,
    },
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: ["ProductRepository"],
})
export class ProductModule {}

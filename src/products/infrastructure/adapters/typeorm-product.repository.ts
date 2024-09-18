import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../domain/product.entity";
import { ProductRepository } from "../../domain/product.repository";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Product(
          entity.id,
          entity.name,
          entity.description,
          entity.price,
          entity.stock
        )
    );
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.stock
    );
  }

  async save(product: Product): Promise<void> {
    const entity = this.repository.create(product);
    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(product: Product): Promise<void> {
    await this.repository.update(product.id, product);
  }

  async clear(): Promise<void> {
    await this.repository.delete({});
  }
}

import { Product } from "./product.entity";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

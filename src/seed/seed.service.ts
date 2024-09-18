import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "src/products/domain/product.repository";
import { Product } from "src/products/domain/product.entity";
import { v4 as uuidv4 } from "uuid";
import { TransactionRepository } from "src/transactions/domain/transaction.repository";

@Injectable()
export class SeedService {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository
  ) {}

  async seedProducts() {
    await this.transactionRepository.clear();

    await this.productRepository.clear();

    const products: Product[] = [
      {
        id: uuidv4(),
        name: "Apple iPhone 13",
        description: "Latest model with A15 Bionic chip",
        price: 3999000, // Approx. 999 USD to COP
        stock: 100,
      },
      {
        id: uuidv4(),
        name: "Samsung Galaxy S21",
        description: "Flagship model with Exynos 2100",
        price: 3599000, // Approx. 899 USD to COP
        stock: 150,
      },
      {
        id: uuidv4(),
        name: "Sony WH-1000XM4",
        description: "Industry-leading noise canceling headphones",
        price: 1399000, // Approx. 349 USD to COP
        stock: 200,
      },
      {
        id: uuidv4(),
        name: "Dell XPS 13",
        description: "High-performance laptop with Intel i7",
        price: 4799000, // Approx. 1199 USD to COP
        stock: 50,
      },
      {
        id: uuidv4(),
        name: "Apple MacBook Pro",
        description: "Powerful laptop with M1 chip",
        price: 5199000, // Approx. 1299 USD to COP
        stock: 75,
      },
      {
        id: uuidv4(),
        name: "Google Pixel 6",
        description: "Newest Google phone with Tensor chip",
        price: 3199000, // Approx. 799 USD to COP
        stock: 120,
      },
      {
        id: uuidv4(),
        name: "Bose QuietComfort 35 II",
        description: "Wireless Bluetooth headphones",
        price: 1199000, // Approx. 299 USD to COP
        stock: 180,
      },
      {
        id: uuidv4(),
        name: "Amazon Echo Dot",
        description: "Smart speaker with Alexa",
        price: 199000, // Approx. 49 USD to COP
        stock: 300,
      },
      {
        id: uuidv4(),
        name: "Fitbit Charge 5",
        description: "Advanced fitness and health tracker",
        price: 699000, // Approx. 179 USD to COP
        stock: 250,
      },
      {
        id: uuidv4(),
        name: "Nintendo Switch",
        description: "Popular gaming console",
        price: 1199000, // Approx. 299 USD to COP
        stock: 90,
      },
    ];

    for (const product of products) {
      await this.productRepository.save(product);
    }

    return { message: "Products seeded successfully" };
  }
}

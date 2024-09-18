import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { TransactionRepository } from "../domain/transaction.repository";
import { Transaction } from "../domain/transaction.entity";
import { v4 as uuidv4 } from "uuid";
import { ProductRepository } from "src/products/domain/product.repository";
import { WompiService } from "src/payments/wompi.service";
import {
  CreditCardInfo,
  CustomerData,
} from "src/payments/interfaces/interface-transaction-use-case";
import { User } from "src/users/domain/user.entity";
import { UserRepository } from "src/users/domain/user.repository";

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository,
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
    private readonly wompiService: WompiService
  ) {}

  async execute(
    userId: string,
    productId: string,
    quantity: number,
    cardInfo: CreditCardInfo,
    customerData: CustomerData
  ): Promise<Transaction> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    console.log(userId);

    const user = await this.userRepository.findByClerkUserId(userId);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    console.log(product.stock, quantity);

    if (product.stock < quantity) {
      throw new HttpException("Insufficient stock", HttpStatus.BAD_REQUEST);
    }

    const totalPrice = product.price * quantity;

    const wompiAcceptanceToken = await this.wompiService.getAcceptanceToken();
    //console.log(wompiAcceptanceToken);

    const wompiCreditCardTokenId =
      await this.wompiService.createTokenCreditCard(cardInfo);

    console.log(wompiCreditCardTokenId);

    const wompiTransactionId = await this.wompiService.createTransaction(
      wompiAcceptanceToken,
      totalPrice,
      wompiCreditCardTokenId,
      customerData
    );

    const transaction = new Transaction(
      wompiTransactionId,
      product,
      quantity,
      totalPrice,
      new Date(),
      "PENDING",
      user
    );
    await this.transactionRepository.save(transaction);

    console.log(wompiTransactionId);

    //console.log(wompiCreditCardTokenId);

    product.stock -= quantity;
    await this.productRepository.update(product);
    return transaction;
  }
}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./products/product.module";
import { TransactionModule } from "./transactions/transaction.module";
import { SeedController } from "./seed/seed.controller";
import { SeedService } from "./seed/seed.service";
import { UserModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class AppModule {}

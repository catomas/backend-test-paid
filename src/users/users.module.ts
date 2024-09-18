import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./infrastructure/entities/user.entity";
import { UserController } from "./infrastructure/controllers/user.controller";
import { FindByClerkUserIdUseCase } from "./aplication/find-by-clerk-user-id.use-case";
import { CreateUseFromClerkUseCase } from "./aplication/create-user-from-clerk.use-case";
import { UsersService } from "./users.service";
import { TypeOrmUserRepository } from "./infrastructure/adapters/typeorm-user.repository";
import { TransactionModule } from "src/transactions/transaction.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => TransactionModule),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    {
      provide: "UserRepository",
      useClass: TypeOrmUserRepository,
    },
    FindByClerkUserIdUseCase,
    CreateUseFromClerkUseCase,
  ],
  exports: ["UserRepository"],
})
export class UserModule {}

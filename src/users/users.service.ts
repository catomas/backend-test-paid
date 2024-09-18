import { Injectable } from "@nestjs/common";
import { CreateUseFromClerkUseCase } from "./aplication/create-user-from-clerk.use-case";
import { FindByClerkUserIdUseCase } from "./aplication/find-by-clerk-user-id.use-case";

@Injectable()
export class UsersService {
  constructor(
    private readonly createUseFromClerkUseCase: CreateUseFromClerkUseCase,
    private readonly findByClerkUserIdUseCase: FindByClerkUserIdUseCase
  ) {}

  async createUserFromClerk(clerkUserId: string, email: string): Promise<void> {
    return this.createUseFromClerkUseCase.execute(clerkUserId, email);
  }

  async findByClerkUserId(clerkUserId: string) {
    return this.findByClerkUserIdUseCase.execute(clerkUserId);
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

@Injectable()
export class FindByClerkUserIdUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(clerkUserId: string): Promise<User | null> {
    return this.userRepository.findByClerkUserId(clerkUserId);
  }
}

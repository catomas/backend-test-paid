import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

@Injectable()
export class CreateUseFromClerkUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {}

  async execute(clerkUserId: string, email: string): Promise<void> {
    const user = new User(clerkUserId, email, []);
    await this.userRepository.save(user);
  }
}

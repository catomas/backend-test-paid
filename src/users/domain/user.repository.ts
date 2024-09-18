import { User } from "./user.entity";

export interface UserRepository {
  findByClerkUserId(clerkUserId: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

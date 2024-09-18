import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUserFromClerk(
      createUserDto.clerkUserId,
      createUserDto.email
    );
  }

  @Get(":clerkUserId")
  async findByClerkUserId(@Param("clerkUserId") clerkUserId: string) {
    return this.userService.findByClerkUserId(clerkUserId);
  }
}

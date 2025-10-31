import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import type { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create(data: ICreateUserDTO): Promise<User> {
    const existing = await this.usersRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}
export { CreateUserService };

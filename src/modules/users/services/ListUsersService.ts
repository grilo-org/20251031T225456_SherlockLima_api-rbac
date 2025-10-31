import { User } from "@prisma/client";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class ListUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async list(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
export { ListUserService };

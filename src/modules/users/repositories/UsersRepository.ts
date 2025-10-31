// src/modules/users/repositories/UsersRepository.ts
import { prisma } from "@database/connection";
import { User } from "@prisma/client";
import type { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: ICreateUserDTO): Promise<User> {
    return prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}

export { UsersRepository };

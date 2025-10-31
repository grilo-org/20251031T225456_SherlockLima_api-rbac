import { User } from "@prisma/client";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";

interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
}
export { IUsersRepository };

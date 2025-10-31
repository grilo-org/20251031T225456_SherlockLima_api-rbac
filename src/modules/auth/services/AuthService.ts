import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { ILoginDTO } from "@modules/auth/dtos/ILoginDTO";
import type { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

export class AuthService {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async login({ email, password }: ILoginDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET not defined in environment variables");
    }

    const token = jwt.sign({}, jwtSecret, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return token;
  }
}

import { Request, Response } from "express";
import { AuthService } from "@modules/auth/services/AuthService";
import type { ILoginDTO } from "@modules/auth/dtos/ILoginDTO";
import { UsersRepository } from "@modules/users/repositories/UsersRepository";

class AuthController {
  private readonly authService: AuthService;

  constructor() {
    const repository = new UsersRepository();
    this.authService = new AuthService(repository);
  }

  login = async (
    req: Request<unknown, unknown, ILoginDTO>,
    res: Response
  ): Promise<void> => {
    const { email, password } = req.body;

    try {
      const token: string = await this.authService.login({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error" });
      }
    }
  };
}

export { AuthController };

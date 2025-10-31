import { Request, Response } from "express";
import type { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { CreateUserService } from "@modules/users/services/CreateUserService";
import { ListUserService } from "@modules/users/services/ListUsersService";
import { UsersRepository } from "@modules/users/repositories/UsersRepository";

class UsersController {
  private readonly createUserService: CreateUserService;
  private readonly listUserService: ListUserService;

  constructor() {
    const repository = new UsersRepository();
    this.createUserService = new CreateUserService(repository);
    this.listUserService = new ListUserService(repository);
  }

  create = async (
    req: Request<unknown, unknown, ICreateUserDTO>,
    res: Response
  ): Promise<void> => {
    try {
      const user = await this.createUserService.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(error instanceof Error ? 400 : 500).json({
        error: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  };

  list = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.listUserService.list();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Unexpected error" });
    }
  };
}

export { UsersController };

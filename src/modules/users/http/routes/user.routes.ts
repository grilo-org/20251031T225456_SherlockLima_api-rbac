import { Router } from "express";
import { ensureAuthenticated } from "@shared/middlewares/Authenticated";
import { ensureAuthorized } from "@shared/middlewares/Authorized";
import { UsersController } from "@modules/users/http/controllers/UsersController";

const userRoutes = Router();
const controller = new UsersController();

userRoutes.post("/", controller.create);
userRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAuthorized("list_users"),
  controller.list
);

export { userRoutes };

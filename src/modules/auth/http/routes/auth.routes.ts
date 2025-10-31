import { Router } from "express";
import { AuthController } from "@modules/auth/http/controllers/AuthController";

const controller = new AuthController();
const authRoutes = Router();

authRoutes.post("/login", controller.login);

export { authRoutes };

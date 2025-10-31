import { Router } from "express";
import { authRoutes } from "@modules/auth/http/routes/auth.routes";
import { userRoutes } from "@modules/users/http/routes/user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export { router };

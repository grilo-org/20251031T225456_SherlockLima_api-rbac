import type { NextFunction } from "express";
import { prisma } from "@database/connection";
import type { Request, Response } from "express";

export function ensureAuthorized(permission: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(403).json({ error: "User ID not found in request" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        role: {
          include: { permissions: true },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const hasPermission = user.role.permissions.some(
      (p) => p.action === permission
    );

    if (!hasPermission) {
      res.status(403).json({ error: "User does not have permission" });
      return;
    }

    next();
  };
}

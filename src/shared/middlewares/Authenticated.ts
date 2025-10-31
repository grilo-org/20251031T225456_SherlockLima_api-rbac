import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token is missing" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

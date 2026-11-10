import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../prisma/db";

import type { User } from "../@types";

export const checkUser = async (
  req: Request & { user?: User | null },
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const splitedToken = token.split(" ")[1] as string;

    const decodedToken = jwt.verify(
      splitedToken,
      process.env.JWT_SECRET as string,
    ) as { id: number };
    const userId = decodedToken.id;

    const user = await db.orm.public.User.where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

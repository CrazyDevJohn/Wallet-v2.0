import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { db } from "../prisma/db";
import { validateUser } from "../validation/user.validate";
import { z, ZodString } from "zod";
import type { User } from "../@types";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await db.orm.public.User.where({
      email: email,
    }).first();

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await db.orm.public.User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      },
    );

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error registering User:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = z
      .object<{ email: ZodString; password: ZodString }>({
        password: z.string().min(6).trim(),
        email: z
          .string()
          .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)
          .toLowerCase(),
      })
      .safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = await db.orm.public.User.where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "User signed in successfully",
      user: { email: user.email, id: user.id },
      token,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const profile = async (
  req: Request & {
    user?: User | null;
  },
  res: Response,
) => {
  const user = req?.user || null;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    user: { ...user, password: undefined },
  });
};

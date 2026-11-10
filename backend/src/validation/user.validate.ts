import { z } from "zod";
import type { User } from "../@types";

const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3).trim(),
  password: z.string().min(6).trim(),
  email: z
    .string()
    .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)
    .toLowerCase(),
  name: z.string().min(1).trim(),
  createdAt: z.string().optional(),
});

export const validateUser = (userData: Partial<User>) => {
  const result = userSchema.safeParse(userData);

  return result;
};

import { z } from "zod";
import { RoleEnum } from "../config/db.enum";
export const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  name: z.string({ required_error: "Full name is required" }),
  location:z.string({ required_error: "Location is required" }),
  role: z
    .enum(["admin", "user"], { required_error: "Role is required" })
    .refine((value) => ["admin", "user"].includes(value), {
      message: "Role must be either 'admin or user'.",
    }),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email format").optional(),
  location: z.string().min(3, "Location must be at least 3 characters").optional(),
  role: z
    .enum(["admin", "user"], { required_error: "Role is required" })
    .refine((value) => ["admin", "user"].includes(value), {
      message: "Role must be either 'admin or user'.",
    }).optional(),
});
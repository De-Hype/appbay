"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    name: zod_1.z.string({ required_error: "Full name is required" }),
    location: zod_1.z.string({ required_error: "Location is required" }),
    role: zod_1.z
        .enum(["admin", "user"], { required_error: "Role is required" })
        .refine((value) => ["admin", "user"].includes(value), {
        message: "Role must be either 'admin or user'.",
    }),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    location: zod_1.z.string().min(3, "Location must be at least 3 characters").optional(),
    role: zod_1.z
        .enum(["admin", "user"], { required_error: "Role is required" })
        .refine((value) => ["admin", "user"].includes(value), {
        message: "Role must be either 'admin or user'.",
    }).optional(),
});

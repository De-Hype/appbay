import { z } from "zod";
export const createItemSchema = z.object({
  name: z.string({ required_error: "Item name is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z.number({ required_error: "Price must be a number" }),
});

export const updateItemSchema = z.object({
  name: z.string({ required_error: "Item name is required" }).optional(),
  description: z.string({ required_error: "Description is required" }).optional(),
  price: z.number({ required_error: "Item must be a number" }).optional(),
});

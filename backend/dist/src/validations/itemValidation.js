"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemSchema = exports.createItemSchema = void 0;
const zod_1 = require("zod");
exports.createItemSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Item name is required" }),
    description: zod_1.z.string({ required_error: "Description is required" }),
    price: zod_1.z.number({ required_error: "Price must be a number" }),
});
exports.updateItemSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Item name is required" }).optional(),
    description: zod_1.z.string({ required_error: "Description is required" }).optional(),
    price: zod_1.z.number({ required_error: "Item must be a number" }).optional(),
});

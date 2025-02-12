import express from "express";
import Limiter from "../middleware/rateLimit";
import validate from "../middleware/validateZod";

import { createItemHandler, deleteItemHandler, fetchItemHandler, fetchItemsHandler, updateItemHandler } from "../controllers/item.controller";
import { createItemSchema, updateItemSchema } from "../validations/itemValidation";

const router = express.Router();

router.post("/items", validate(createItemSchema), createItemHandler);
router.get("/items", fetchItemsHandler);
router.get("/items/:id", fetchItemHandler)
router.put("/items/:id", validate(updateItemSchema), updateItemHandler)
router.delete("/items/:id", deleteItemHandler)

export default router;

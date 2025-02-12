import express from "express";
import validate from "../middleware/validateZod";
import { createUserSchema, updateUserSchema } from "../validations/userValidation";
import { createUserHandler, deleteUserHandler, fetchAUserHandler, fetchUsersHandler, updateUserHandler } from "../controllers/user.controller";

const router = express.Router();

router.post("/users", validate(createUserSchema), createUserHandler);
router.get("/users", fetchUsersHandler);
router.get("/users/:id", fetchAUserHandler)
router.put("/users/:id", validate(updateUserSchema), updateUserHandler)
router.delete("/users/:id", deleteUserHandler)

export default router;

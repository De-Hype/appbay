"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateZod_1 = __importDefault(require("../middleware/validateZod"));
const userValidation_1 = require("../validations/userValidation");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/users", (0, validateZod_1.default)(userValidation_1.createUserSchema), user_controller_1.createUserHandler);
router.get("/users", user_controller_1.fetchUsersHandler);
router.get("/users/:id", user_controller_1.fetchAUserHandler);
router.put("/users/:id", (0, validateZod_1.default)(userValidation_1.updateUserSchema), user_controller_1.updateUserHandler);
router.delete("/users/:id", user_controller_1.deleteUserHandler);
exports.default = router;

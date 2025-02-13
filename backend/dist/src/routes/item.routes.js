"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateZod_1 = __importDefault(require("../middleware/validateZod"));
const item_controller_1 = require("../controllers/item.controller");
const itemValidation_1 = require("../validations/itemValidation");
const router = express_1.default.Router();
router.post("/items", (0, validateZod_1.default)(itemValidation_1.createItemSchema), item_controller_1.createItemHandler);
router.get("/items", item_controller_1.fetchItemsHandler);
router.get("/items/:id", item_controller_1.fetchItemHandler);
router.put("/items/:id", (0, validateZod_1.default)(itemValidation_1.updateItemSchema), item_controller_1.updateItemHandler);
router.delete("/items/:id", item_controller_1.deleteItemHandler);
exports.default = router;

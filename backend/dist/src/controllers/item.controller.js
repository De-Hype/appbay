"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItemsHandler = exports.deleteItemHandler = exports.updateItemHandler = exports.fetchItemHandler = exports.fetchItemsHandler = exports.createItemHandler = void 0;
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const AppResponse_1 = __importDefault(require("../helpers/AppResponse"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const logAction_1 = require("../helpers/logAction");
const item_model_1 = require("../models/item.model");
const sequelize_1 = require("sequelize");
exports.createItemHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    const numPrice = Number(price);
    const newItem = yield item_model_1.Item.create({ name, description, price: numPrice });
    yield (0, logAction_1.logAction)("create", "Item", { newItem });
    if (!newItem)
        return next(new AppError_1.default("Could not create a new Item", 400));
    return (0, AppResponse_1.default)(res, "Item created successfully", 201, newItem);
}));
exports.fetchItemsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { count, rows: items } = yield item_model_1.Item.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    if (!items.length)
        return next(new AppError_1.default("No items found", 404));
    return (0, AppResponse_1.default)(res, "Items fetched successfully", 200, {
        items,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
    });
}));
exports.fetchItemHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield item_model_1.Item.findByPk(id);
    if (!item)
        return next(new AppError_1.default(`Could not find item matching the ID ${id} `, 400));
    return (0, AppResponse_1.default)(res, "Item fetched successfully", 200, item);
}));
exports.updateItemHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const item = yield item_model_1.Item.findByPk(id);
    if (!item)
        return next(new AppError_1.default(`Could not find Item matching the ID ${id} `, 400));
    const updateItem = yield item.update({
        name,
        description,
        price,
    });
    yield (0, logAction_1.logAction)("update", "Item", { item });
    if (!updateItem)
        return next(new AppError_1.default(`Could not update Item with the ID ${id} `, 400));
    return (0, AppResponse_1.default)(res, "Item updated successfully", 200, item);
}));
exports.deleteItemHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield item_model_1.Item.findByPk(id);
    if (!item)
        return next(new AppError_1.default(`Could not find item matching the ID ${id} `, 400));
    const deletedItem = yield item.destroy();
    yield (0, logAction_1.logAction)("delete", "Item", { deletedItem });
    return (0, AppResponse_1.default)(res, "Item deleted successfully", 200, deletedItem);
}));
exports.searchItemsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { count, rows: items } = yield item_model_1.Item.findAndCountAll({
        where: {
            name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            },
        },
        offset,
        limit,
    });
    if (!items.length) {
        return next(new AppError_1.default("No items found", 404));
    }
    return (0, AppResponse_1.default)(res, "Items fetched successfully", 200, {
        total: count,
        page,
        limit,
        items,
    });
}));

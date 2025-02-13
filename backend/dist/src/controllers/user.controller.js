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
exports.deleteUserHandler = exports.updateUserHandler = exports.fetchAUserHandler = exports.fetchUsersHandler = exports.createUserHandler = void 0;
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const AppResponse_1 = __importDefault(require("../helpers/AppResponse"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../models/user.model");
const logAction_1 = require("../helpers/logAction");
exports.createUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, location, role } = req.body;
    const existingUser = yield user_model_1.User.findOne({ where: { email } });
    if (existingUser)
        return next(new AppError_1.default("User with this email already exist", 400));
    const newUser = yield user_model_1.User.create({ name, email, location, role });
    const log = yield (0, logAction_1.logAction)("create", "User", { newUser });
    if (!newUser)
        return next(new AppError_1.default("Could not create a new user", 400));
    return (0, AppResponse_1.default)(res, "User created successfully", 201, newUser);
}));
exports.fetchUsersHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { role, joined } = req.query;
    console.log(role, joined);
    const roleFilter = role && ["admin", "user"].includes(role) ? { role } : {};
    let dateFilter = {};
    if (joined === "yesterday") {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        dateFilter = { createdAt: { $gte: yesterday } };
    }
    else if (joined === "lastWeek") {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setHours(0, 0, 0, 0);
        dateFilter = { createdAt: { $gte: lastWeek } };
    }
    const { count, rows: users } = yield user_model_1.User.findAndCountAll({
        where: Object.assign(Object.assign({}, roleFilter), dateFilter),
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    if (!users.length)
        return next(new AppError_1.default("No users found", 404));
    return (0, AppResponse_1.default)(res, "Users fetched successfully", 200, {
        users,
        totalUsers: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
    });
}));
exports.fetchAUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findByPk(id);
    console.log(user);
    if (!user)
        return next(new AppError_1.default(`Could not find user matching the ID ${id} `, 400));
    return (0, AppResponse_1.default)(res, "User fetched successfully", 200, user);
}));
exports.updateUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, location, role } = req.body;
    const user = yield user_model_1.User.findByPk(id);
    if (!user)
        return next(new AppError_1.default(`Could not find user matching the ID ${id} `, 400));
    const updateUser = yield user.update({ name, email, location, role });
    yield (0, logAction_1.logAction)("update", "User", { user });
    if (!updateUser)
        return next(new AppError_1.default(`Could not update user with the ID ${id} `, 400));
    return (0, AppResponse_1.default)(res, "User updated successfully", 200, user);
}));
exports.deleteUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findByPk(id);
    if (!user)
        return next(new AppError_1.default(`Could not find user matching the ID ${id} `, 400));
    const deletedUser = yield user.destroy();
    yield (0, logAction_1.logAction)("delete", "User", { deletedUser });
    return (0, AppResponse_1.default)(res, "User deleted successfully", 200, deletedUser);
}));

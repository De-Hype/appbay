"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEnum = void 0;
const sequelize_1 = require("sequelize");
exports.RoleEnum = {
    type: sequelize_1.DataTypes.ENUM("admin", "user"),
    allowNull: false,
};

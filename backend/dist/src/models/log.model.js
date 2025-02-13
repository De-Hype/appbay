"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const sequelize_1 = require("sequelize");
class Log extends sequelize_1.Model {
    static initModel(sequelize) {
        Log.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            action: {
                type: sequelize_1.DataTypes.ENUM("create", "update", "delete"),
                allowNull: false,
            },
            model: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            details: {
                type: sequelize_1.DataTypes.JSON,
            },
            timestamp: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        }, {
            sequelize,
            tableName: "logs",
        });
    }
}
exports.Log = Log;

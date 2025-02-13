"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const sequelize_1 = require("sequelize");
class Item extends sequelize_1.Model {
    static initModel(sequelize) {
        Item.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
            },
            price: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "items",
        });
    }
}
exports.Item = Item;

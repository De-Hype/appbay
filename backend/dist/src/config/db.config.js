"use strict";
// // import { Sequelize } from "sequelize";
// // import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../../serviceUrl";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// // console.log("DB CONFIG:", {
// //   name: process.env.DB_NAME,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// // });
// // export const sequelize = new Sequelize(
// //   DB_NAME,
// //   DB_USER,
// //   DB_PASSWORD,
// //   {
// //     // host: DB_HOST,
// //     dialect: "postgres",
// //     port: Number(process.env.DB_PORT),
// //     logging: false,
// //   }
// // );
// import { Sequelize } from "sequelize";
// import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../../serviceUrl";
// import { User } from "../models/user.model";
// import { Item } from "../models/item.model";
// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   dialect: "postgres",
//   port: Number(process.env.DB_PORT),
//   logging: false,
// });
// User.initModel(sequelize);
// sequelize
//   .sync({ alter: true }) 
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection failed:", err));
const sequelize_1 = require("sequelize");
const serviceUrl_1 = require("../../serviceUrl");
const user_model_1 = require("../models/user.model");
const item_model_1 = require("../models/item.model");
const log_model_1 = require("../models/log.model");
exports.sequelize = new sequelize_1.Sequelize(serviceUrl_1.DB_NAME, serviceUrl_1.DB_USER, serviceUrl_1.DB_PASSWORD, {
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    logging: false,
});
// Initialize models
user_model_1.User.initModel(exports.sequelize);
item_model_1.Item.initModel(exports.sequelize);
log_model_1.Log.initModel(exports.sequelize);
exports.sequelize
    .sync({ alter: true }) // Ensures smooth database updates without dropping tables
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed:", err));

// // import { Sequelize } from "sequelize";
// // import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../../serviceUrl";

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

import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../../serviceUrl";
import { User } from "../models/user.model";
import { Item } from "../models/item.model";
import { Log } from "../models/log.model";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  port: Number(process.env.DB_PORT),
  logging: false,
});

// Initialize models
User.initModel(sequelize);
Item.initModel(sequelize);
Log.initModel(sequelize)


sequelize
  .sync({ alter: true }) // Ensures smooth database updates without dropping tables
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

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


User.initModel(sequelize);
Item.initModel(sequelize);
Log.initModel(sequelize)


sequelize
  .sync({ alter: true }) 
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

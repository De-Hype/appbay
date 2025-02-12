import { DataTypes } from "sequelize";

export const RoleEnum = {
  type: DataTypes.ENUM("admin", "user"),
  allowNull: false,
};


import { DataTypes, Model, Sequelize } from "sequelize";
import { RoleEnum } from "../config/db.enum";

export class User extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public email!: string;
  public role!: "admin" | "user";
  public createdAt!: Date; // Timestamp
  public updatedAt!: Date; // Timestamp
  
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: RoleEnum,
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true, // Enables Sequelize to auto-manage timestamps
      }
    );
  }
}

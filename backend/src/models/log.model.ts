import { DataTypes, Model, Sequelize } from "sequelize";

export class Log extends Model {
    public id!: number;
    public action!: "create" | "update" | "delete";
    public model!: string;
    public details?: object;
    public timestamp!: Date;
    
    static initModel(sequelize: Sequelize) {
      Log.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          action: {
            type: DataTypes.ENUM("create", "update", "delete"),
            allowNull: false,
          },
          model: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          details: {
            type: DataTypes.JSON,
          },
          timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
        },
        {
          sequelize,
          tableName: "logs",
        }
      );
    }
  }
  
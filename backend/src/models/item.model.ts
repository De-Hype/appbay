import { DataTypes, Model, Sequelize } from "sequelize";

export class Item extends Model {
    public id!: number;
    public name!: string;
    public description?: string;
    public price!: number;
    
    static initModel(sequelize: Sequelize) {
      Item.init(
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
          description: {
            type: DataTypes.STRING,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
        },
        {
          sequelize,
          tableName: "items",
        }
      );
    }
  }
  
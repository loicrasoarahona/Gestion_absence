import { DataTypes, Model } from "sequelize";
import { AuthorAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class Author extends Model<AuthorAttributes> {}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
  },
  { sequelize, tableName: "author", modelName: "Author" },
);

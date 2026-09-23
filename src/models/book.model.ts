import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { BookAttributes } from "../types/interfaces.js";
import { Author } from "./author.model.js";

export class Book extends Model<BookAttributes> {}

Book.init(
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
      field: "author_id",
    },
  },
  { sequelize, tableName: "book", modelName: "Book" },
);

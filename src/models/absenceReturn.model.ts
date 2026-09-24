import { DataTypes, Model } from "sequelize";
import { AbsenceReturnAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

export class AbsenceReturn extends Model<AbsenceReturnAttributes> {}

AbsenceReturn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "return_date",
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "reason",
    },
  },
  { sequelize, tableName: "absence_return", modelName: "AbsenceReturn" },
);

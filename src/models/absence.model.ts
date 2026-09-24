import { DataTypes, Model } from "sequelize";
import { AbsenceAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { AbsenceReturn } from "./absenceReturn.model.js";

export class Absence extends Model<AbsenceAttributes> {}

Absence.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    absenceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "absence_date",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_name",
    },
    studentSurname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_surname",
    },
    studentClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_class",
    },
    absenceReturnId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: AbsenceReturn,
        key: "id",
      },
      field: "absence_return_id",
    },
  },
  { sequelize, tableName: "absence", modelName: "Absence" },
);

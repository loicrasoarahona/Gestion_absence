import { DataTypes, Model } from "sequelize";
import { AbsenceAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";

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
    studentClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "student_class",
    },
  },
  { sequelize, tableName: "absence", modelName: "Absence" },
);

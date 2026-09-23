import { DataTypes, Model } from "sequelize";
import { AlertSentAttributes } from "../types/interfaces.js";
import sequelize from "../config/database.js";
import { Absence } from "./absence.model.js";
import { AlertSentType } from "./alertSentType.model.js";

export class AlertSent extends Model<AlertSentAttributes> {}

AlertSent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    absenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Absence,
        key: "id",
      },
      field: "absence_id",
    },
    alertSentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AlertSentType,
        key: "id",
      },
      field: "alert_sent_type_id",
    },
    alertSentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "alert_sent_at",
    },
    contactDetails: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "contact_details",
    },
  },
  { sequelize, tableName: "alert_sent", modelName: "AlertSent" },
);

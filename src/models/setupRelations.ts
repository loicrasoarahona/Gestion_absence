import { Absence } from "./absence.model.js";
import { AbsenceReturn } from "./absenceReturn.model.js";
import { AlertSent } from "./alertSent.model.js";
import { AlertSentType } from "./alertSentType.model.js";

export function setupRelations() {
  AbsenceToAbsenceReturnRelation();
  AbsenceToAlertSentRelation();
  AlertSentTypeToAlertSentRelation();
}

function AbsenceToAbsenceReturnRelation() {
  Absence.hasMany(AbsenceReturn, { foreignKey: "absenceId", as: "returns" });
  AbsenceReturn.belongsTo(Absence, { foreignKey: "absenceId", as: "absence" });
}

function AbsenceToAlertSentRelation() {
  Absence.hasMany(AlertSent, { foreignKey: "absenceId", as: "alerts" });
  AlertSent.belongsTo(Absence, { foreignKey: "absenceId", as: "absence" });
}

function AlertSentTypeToAlertSentRelation() {
  AlertSentType.hasMany(AlertSent, {
    foreignKey: "alertSentTypeId",
    as: "alerts",
  });
  AlertSent.belongsTo(AlertSentType, {
    foreignKey: "alertSentTypeId",
    as: "alertSentType",
  });
}

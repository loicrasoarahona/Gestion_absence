import { AlertSentAttributes } from "../types/interfaces.js";

export interface AbsenceService {
  sendAlertByEmail(
    absenceId: number,
    parentId?: number,
  ): Promise<AlertSentAttributes>;
  sendAlertByPhone(
    absenceId: number,
    parentId?: number,
  ): Promise<AlertSentAttributes>;
  getAlertMessageModel(
    absenceId: number,
    alertType: "email" | "phone",
    parentId?: number,
  ): Promise<string>;
}

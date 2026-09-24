import { AlertSentAttributes } from "../types/interfaces.js";

export interface AbsenceService {
  sendAlertByEmail(absenceId: number): Promise<AlertSentAttributes>;
  sendAlertByPhone(absenceId: number): Promise<AlertSentAttributes>;
}

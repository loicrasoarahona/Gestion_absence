export interface AbsenceService {
  sendAlertByEmail(absenceId: number): Promise<void>;
  sendAlertByPhone(absenceId: number): Promise<void>;
}

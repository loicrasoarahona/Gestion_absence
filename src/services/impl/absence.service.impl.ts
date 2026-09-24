import { AbsenceService } from "../absence.service.js";

export class AbsenceServiceImpl implements AbsenceService {
  public async sendAlertByEmail(absenceId: number): Promise<void> {
    return;
  }

  public async sendAlertByPhone(absenceId: number): Promise<void> {}
}

import serviceLocatorCore from "../../core/service-locator.core.js";
import { EntityNotFoundError } from "../../error/entity-not-found.error.js";
import { AlertSent } from "../../models/alertSent.model.js";
import { AlertSentType } from "../../models/alertSentType.model.js";
import { AbsenceRepository } from "../../repositories/absence.repository.js";
import { StudentDto } from "../../types/dto.js";
import { AbsenceService } from "../absence.service.js";

export class AbsenceServiceImpl implements AbsenceService {
  public async sendAlertByEmail(absenceId: number): Promise<void> {
    const absence = await AbsenceRepository.findById(absenceId);
    if (!absence)
      throw new EntityNotFoundError(`Absence ${absenceId} not found`);
    const studentId = absence.studentId;
    const student: StudentDto =
      await serviceLocatorCore.studentClient.findById(studentId);
    const email = student.parents?.[0].email;
    if (!email) throw "undefined parent email";
    const subject = "Alerte d'absence";
    const parentName = student.parents?.[0].name ?? "";
    const formattedDate = new Date(absence.absenceDate).toLocaleDateString(
      "fr-FR",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    );
    const contentHtml = `
      <p>Bonjour ${parentName},</p>
      <p>
        Nous vous informons que votre enfant
        <strong>${absence.studentName} ${absence.studentSurname}</strong>
        (classe ${absence.studentClass}) a été signalé(e) absent(e) le
        <strong>${formattedDate}</strong>.
      </p>
      <p>Merci de bien vouloir justifier cette absence auprès de l'établissement.</p>
    `;
    await serviceLocatorCore.mailService.sendMail(email, subject, contentHtml);

    const alertSentType = await AlertSentType.findOne({
      where: { name: "email" },
    });
    if (!alertSentType)
      throw new EntityNotFoundError(`AlertSentType "email" not found`);

    await AlertSent.create({
      absenceId,
      alertSentTypeId: alertSentType.dataValues.id!,
      alertSentAt: new Date(),
      contactDetails: email,
    });
  }

  public async sendAlertByPhone(absenceId: number): Promise<void> {}
}

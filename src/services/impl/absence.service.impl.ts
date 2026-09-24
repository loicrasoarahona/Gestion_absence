import serviceLocatorCore from "../../core/service-locator.core.js";
import { EntityNotFoundError } from "../../error/entity-not-found.error.js";
import { AlertSent } from "../../models/alertSent.model.js";
import { AlertSentType } from "../../models/alertSentType.model.js";
import { AbsenceRepository } from "../../repositories/absence.repository.js";
import { StudentDto } from "../../types/dto.js";
import {
  AlertSentAttributes,
  AlertSentStatus,
} from "../../types/interfaces.js";
import { AbsenceService } from "../absence.service.js";

const SCHOOL_PHONE_NUMBER = process.env.SCHOOL_PHONE_NUMBER;

export class AbsenceServiceImpl implements AbsenceService {
  public async sendAlertByEmail(
    absenceId: number,
  ): Promise<AlertSentAttributes> {
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
      <p>Pour toute question, contactez-nous au ${SCHOOL_PHONE_NUMBER}.</p>
    `;
    const alertSentType = await AlertSentType.findOne({
      where: { name: "email" },
    });
    if (!alertSentType)
      throw new EntityNotFoundError(`AlertSentType "email" not found`);

    let status: AlertSentStatus = "success";
    let errorMessage: string | null = null;
    try {
      await serviceLocatorCore.mailService.sendMail(
        email,
        subject,
        contentHtml,
      );
    } catch (error) {
      status = "failed";
      errorMessage = error instanceof Error ? error.message : String(error);
    }

    const alertSent = await AlertSent.create({
      absenceId,
      alertSentTypeId: alertSentType.dataValues.id!,
      alertSentAt: new Date(),
      contactDetails: email,
      message: contentHtml,
      status,
      errorMessage,
    });

    if (status === "failed")
      throw new Error(`Échec de l'envoi de l'alerte email: ${errorMessage}`);

    return alertSent.dataValues;
  }

  public async sendAlertByPhone(
    absenceId: number,
  ): Promise<AlertSentAttributes> {
    const absence = await AbsenceRepository.findById(absenceId);
    if (!absence)
      throw new EntityNotFoundError(`Absence ${absenceId} not found`);
    const studentId = absence.studentId;
    const student: StudentDto =
      await serviceLocatorCore.studentClient.findById(studentId);
    const phone = student.parents?.[0].phone;
    if (!phone) throw "undefined parent phone";
    const formattedDate = new Date(absence.absenceDate).toLocaleDateString(
      "fr-FR",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    );
    const content = `Au P'tit Pré: ${absence.studentName} ${absence.studentSurname} (classe ${absence.studentClass}) a ete signale(e) absent(e) le ${formattedDate}. Merci de justifier cette absence. Contact: ${SCHOOL_PHONE_NUMBER}`;

    const alertSentType = await AlertSentType.findOne({
      where: { name: "phone" },
    });
    if (!alertSentType)
      throw new EntityNotFoundError(`AlertSentType "phone" not found`);

    let status: AlertSentStatus = "success";
    let errorMessage: string | null = null;
    try {
      await serviceLocatorCore.smsService.sendSms(phone, content);
    } catch (error) {
      status = "failed";
      errorMessage = error instanceof Error ? error.message : String(error);
    }

    const alertSent = await AlertSent.create({
      absenceId,
      alertSentTypeId: alertSentType.dataValues.id!,
      alertSentAt: new Date(),
      contactDetails: phone,
      message: content,
      status,
      errorMessage,
    });

    if (status === "failed")
      throw new Error(`Échec de l'envoi de l'alerte SMS: ${errorMessage}`);

    return alertSent.dataValues;
  }
}

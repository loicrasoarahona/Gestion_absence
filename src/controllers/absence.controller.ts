import { Request, Response } from "express";
import { Absence } from "../models/absence.model.js";
import { AbsenceReturn } from "../models/absenceReturn.model.js";
import { AbsenceRepository } from "../repositories/absence.repository.js";
import { createAbsenceDto, createAbsenceReturnDto } from "../types/dto.js";
import { retrieveQueryParameter } from "../util/request-param.util.js";
import serviceLocatorCore from "../core/service-locator.core.js";

export class AbsenceController {
  public static async listOngoing(req: Request, res: Response) {
    try {
      const absences = await AbsenceRepository.findOngoing();
      res.json(absences);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de récupérer les absences en cours" });
    }
  }

  public static async createAbsence(req: Request, res: Response) {
    const {
      absenceDate,
      studentId,
      studentName,
      studentSurname,
      studentClass,
    } = req.body as createAbsenceDto;

    if (!studentId || !studentName || !studentSurname || !studentClass) {
      res.status(400).json({ message: "Champs requis manquants" });
      return;
    }

    try {
      const absence = await Absence.create({
        absenceDate: absenceDate ? new Date(absenceDate) : new Date(),
        studentId,
        studentName,
        studentSurname,
        studentClass,
      });

      res.status(201).json(absence);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Impossible de créer l'absence" });
    }
  }

  public static async createAbsenceReturn(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString());
    const { returnDate, reason } = req.body as createAbsenceReturnDto;

    if (!reason) {
      res.status(400).json({ message: "Champs requis manquants" });
      return;
    }

    try {
      const absence = await AbsenceRepository.findById(id);
      if (!absence) {
        res.status(404).json({ message: "Absence non trouvée" });
        return;
      }
      if (absence.absenceReturnId) {
        res.status(409).json({ message: "Cette absence a déjà un retour" });
        return;
      }

      const absenceReturn = await AbsenceReturn.create({
        returnDate: returnDate ? new Date(returnDate) : new Date(),
        reason,
      });

      await Absence.update(
        { absenceReturnId: absenceReturn.dataValues.id },
        { where: { id } },
      );

      res.status(201).json(absenceReturn);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Impossible de créer le retour d'absence" });
    }
  }

  public static async sendAlert(req: Request, res: Response) {
    const alertType = retrieveQueryParameter(req, "alertType", "string");
    const id = req.params.id.toString();
    if (alertType == "email") {
      const alertSent =
        await serviceLocatorCore.absenceService.sendAlertByEmail(parseInt(id));
      return res.status(201).json(alertSent);
    }
    if (alertType == "phone") {
      const alertSent =
        await serviceLocatorCore.absenceService.sendAlertByPhone(parseInt(id));
      return res.status(201).json(alertSent);
    } else {
      throw "alert type not found";
    }
  }
}

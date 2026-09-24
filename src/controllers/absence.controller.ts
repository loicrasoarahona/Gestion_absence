import { Request, Response } from "express";
import { Absence } from "../models/absence.model.js";
import { createAbsenceDto } from "../types/dto.js";
import { retrieveQueryParameter } from "../util/request-param.util.js";
import serviceLocatorCore from "../core/service-locator.core.js";

export class AbsenceController {
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

  public static async sendAlert(req: Request, res: Response) {
    const alertType = retrieveQueryParameter(req, "alertType", "string");
    const id = req.params.id.toString();
    if (alertType == "email") {
      await serviceLocatorCore.absenceService.sendAlertByEmail(parseInt(id));
      return res.json("ok");
    }
    if (alertType == "phone") {
      // gestion par phone
    } else {
      throw "alert type not found";
    }
  }
}

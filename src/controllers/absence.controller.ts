import { Request, Response } from "express";
import { Absence } from "../models/absence.model.js";
import { createAbsenceDto } from "../types/dto.js";

export async function createAbsence(req: Request, res: Response) {
  const { absenceDate, studentId, studentName, studentSurname, studentClass } =
    req.body as createAbsenceDto;

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

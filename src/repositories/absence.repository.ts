import { Absence } from "../models/absence.model.js";
import { AbsenceAttributes } from "../types/interfaces.js";

export class AbsenceRepository {
  public static async findById(id: number): Promise<AbsenceAttributes | null> {
    const result = await Absence.findByPk(id);
    if (!result) return null;
    return result.dataValues;
  }
}

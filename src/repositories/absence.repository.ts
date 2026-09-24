import { literal, Op } from "sequelize";
import { Absence } from "../models/absence.model.js";
import { AlertSent } from "../models/alertSent.model.js";
import { AbsenceAttributes } from "../types/interfaces.js";

export class AbsenceRepository {
  public static async findById(id: number): Promise<AbsenceAttributes | null> {
    const result = await Absence.findByPk(id);
    if (!result) return null;
    return result.dataValues;
  }

  public static async findOngoing(): Promise<AbsenceAttributes[]> {
    const results = await Absence.findAll({
      where: {
        id: {
          [Op.notIn]: literal("(SELECT absence_id FROM absence_return)"),
        },
      },
      include: { model: AlertSent, as: "alerts" },
    });
    return results.map((result) => result.dataValues);
  }
}

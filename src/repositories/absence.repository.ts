import { literal, Op } from "sequelize";
import { Absence } from "../models/absence.model.js";
import { AlertSent } from "../models/alertSent.model.js";
import { AbsenceAttributes, AlertSentAttributes } from "../types/interfaces.js";
import { AlertSentType } from "../models/alertSentType.model.js";

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
      include: {
        model: AlertSent,
        as: "alerts",
        include: [
          {
            model: AlertSentType,
            as: "alertSentType",
          },
        ],
      },
      order: [["absenceDate", "DESC"]],
    });
    return results.map((result) => result.dataValues);
  }

  public static async findLastAlertSent(
    absenceId: number,
    alertType: "email" | "phone",
  ): Promise<AlertSentAttributes | null> {
    const result = await AlertSent.findOne({
      where: { absenceId },
      include: {
        model: AlertSentType,
        as: "alertSentType",
        where: { name: alertType },
      },
      order: [["alertSentAt", "DESC"]],
    });
    if (!result) return null;
    return result.dataValues;
  }
}

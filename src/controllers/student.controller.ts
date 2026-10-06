import { Request, Response } from "express";
import serviceLocatorCore from "../core/service-locator.core.js";

export class StudentController {
  public static async findAll(req: Request, res: Response) {
    const { class_level, name } = req.query;

    try {
      const students = await serviceLocatorCore.studentClient.findAllUsers({
        class_level: class_level ? Number(class_level) : undefined,
        name: name ? String(name) : undefined,
      });

      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(502).json({ message: "Impossible de récupérer les élèves" });
    }
  }

  public static async findAllPaginated(req: Request, res: Response) {
    const { class_level, name, page, limit } = req.query;

    try {
      const students = await serviceLocatorCore.studentClient.findAllUsersPaginated({
        class_level: class_level ? Number(class_level) : undefined,
        name: name ? String(name) : undefined,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });

      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(502).json({ message: "Impossible de récupérer les élèves" });
    }
  }

  public static async findParents(req: Request, res: Response) {
    const id = req.params.id;
    if (typeof id != "string") throw "invalid format of id";
    const retour = await serviceLocatorCore.studentClient.findParents(
      parseInt(id),
    );
    res.json(retour);
  }
}

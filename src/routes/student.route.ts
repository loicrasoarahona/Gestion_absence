import express from "express";
import serviceLocator from "../core/service-locator.core.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { class_level, name } = req.query;

  try {
    const students = await serviceLocator.studentClient.findAllUsers({
      class_level: class_level ? Number(class_level) : undefined,
      name: name ? String(name) : undefined,
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(502).json({ message: "Impossible de récupérer les élèves" });
  }
});

export default router;

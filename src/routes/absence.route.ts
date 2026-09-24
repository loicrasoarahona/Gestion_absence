import express from "express";
import { AbsenceController } from "../controllers/absence.controller.js";

const router = express.Router();

router.post("/", AbsenceController.createAbsence);

router.post("/:id/send-alert", AbsenceController.sendAlert);

export default router;

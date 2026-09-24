import express from "express";
import { AbsenceController } from "../controllers/absence.controller.js";

const router = express.Router();

router.get("/ongoing", AbsenceController.listOngoing);

router.post("/", AbsenceController.createAbsence);

router.post("/:id/send-alert", AbsenceController.sendAlert);

router.post("/:id/return", AbsenceController.createAbsenceReturn);

export default router;

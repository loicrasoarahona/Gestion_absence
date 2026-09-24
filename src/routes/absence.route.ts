import express from "express";
import { createAbsence } from "../controllers/absence.controller.js";

const router = express.Router();

router.post("/", createAbsence);

export default router;

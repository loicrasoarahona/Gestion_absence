import { AlertSentType } from "../models/alertSentType.model.js";
import sequelize from "./database.js";

export async function initDB() {
  await sequelize.authenticate();
  console.log("Connexion PostgreSQL OK");

  await sequelize.sync({ alter: true });
}

export async function insertInitialData() {
  for (const name of ["email", "phone"]) {
    const existing = await AlertSentType.findOne({ where: { name } });
    if (!existing) {
      await AlertSentType.create({ name });
    }
  }
}

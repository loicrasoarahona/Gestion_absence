import sequelize from "./database.js";

export async function initDB() {
  await sequelize.authenticate();
  console.log("Connexion PostgreSQL OK");

  await sequelize.sync({ alter: true });
}

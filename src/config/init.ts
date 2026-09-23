import { Author } from "../models/author.model.js";
import { Book } from "../models/book.model.js";
import sequelize from "./database.js";

export async function initDB() {
  await sequelize.authenticate();
  console.log("Connexion PostgreSQL OK");

  await sequelize.sync({ alter: true });
}

export async function insertInitialData() {
  const JK = await Author.findOne({ where: { name: "J. K. Rowling" } });
  if (!JK) {
    await Author.create(
      {
        name: "J. K. Rowling",
        books: [
          { name: "Harry Potter à l'école des sorciers" },
          { name: "Harry Potter et la Chambre des secrets" },
          { name: "Harry Potter et le Prisonnier d'Azkaban" },
          { name: "Harry Potter et la Coupe de feu" },
          { name: "Harry Potter et l'Ordre du Phénix" },
          { name: "Harry Potter et le Prince de sang-mêlé" },
          { name: "Harry Potter et les Reliques de la Mort" },
        ],
      },
      { include: { model: Book, as: "books" } },
    );
  }

  const JRR = await Author.findOne({ where: { name: "J. R. R. Tolkien" } });
  if (!JRR) {
    await Author.create(
      {
        name: "J. R. R. Tolkien",
        books: [
          { name: "La Communauté de l'Anneau" },
          { name: "Les Deux Tours" },
          { name: "Le Retour du Roi" },
        ],
      },
      { include: { model: Book, as: "books" } },
    );
  }
}

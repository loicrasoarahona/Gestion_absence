import { Author } from "./author.model.js";
import { Book } from "./book.model.js";

export function setupRelations() {
  AuthorToBookRelation();
}

function AuthorToBookRelation() {
  Author.hasMany(Book, { foreignKey: "authorId", as: "books" });
  Book.belongsTo(Author, { foreignKey: "authorId", as: "author" });
}

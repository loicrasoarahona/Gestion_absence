import { Router } from "express";
import { Author } from "../models/author.model.js";
import { Book } from "../models/book.model.js";

const router = Router();

router.get("/", async (req, res) => {
  return res.json(
    await Author.findAll({ include: { model: Book, as: "books" } }),
  );
});

export default router;

import express from "express";
import bookController from "../../controller/book.controller";
import { verifyAuthToken } from "../../utils/verfyAuthToken";

const book = express();

book
  .get("/", bookController.getBooks)
  .get("/:id", bookController.getBook)
  .post("/", verifyAuthToken, bookController.createBook)
  .patch("/:id", verifyAuthToken, bookController.update)
  .delete("/:id", verifyAuthToken, bookController.deleteBook);
export default book;

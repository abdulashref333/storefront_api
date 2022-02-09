import { Request, Response } from "express";
import { Book, BookStore } from "../models/books";
import handlerFactory from "./handlerFactory";

const Book = new BookStore();

const getBooks = handlerFactory.getAll(Book);
const getBook = handlerFactory.getOne(Book);
const createBook = handlerFactory.createOne(Book);
const deleteBook = handlerFactory.deleteOne(Book);
const update = async (req: Request, res: Response): Promise<void> => {
  const results = await Book.index();
  res.json({ results });
};

/*
  * 
  *  Old Style Code Is Below this section. 
  *  Not that we don't use this code any more.
  * 

*/

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
      res.status(400).json({ error: "No Id Was Found" });
      return;
    }
    const results = await Book.show(id);

    if (!results) {
      res.status(404).json({ error: "Element Not Found" });
      return;
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  const book: Book = {
    title: req.body.title,
    author: req.body.author,
    type: req.body.type,
    summary: req.body.summary,
    total_pages: req.body.total_pages,
  };
  try {
    const results = await Book.create(book);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    if (!id) {
      res.status(400).json({ error: "No Id Was Found" });
      return;
    }
    const results = await Book.delete(id);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { getBooks, getBook, createBook, update, deleteBook };

/*
- this file represent our models == tables on the database 
- it's like our js file  ambasdore for the database. 
- every model represent a row on the database table.
- every model is like an instance of thing, so we represents it with a class.
- note every class named with singular because it's represents an instace of object or a row on db.
*/
import Client from "../database";
import Queries from "../queries";
import { IModel } from "../controller/handlerFactory";

export type Book = {
  id?: Number;
  title: string;
  author: string;
  type?: string;
  summary?: string;
  total_pages?: number;
};

/*
 - short note to knowe:
  - every method it should be async because every connection is gonna be asyncronous.
  - as we use ts we should create a type to represents the returned data.
  - after each connection you should realse or close
*/

// TODO: .

export class BookStore implements IModel<Book> {
  creat(obj: Book): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  async index(): Promise<Book[]> {
    try {
      const cn = await Client.connect();
      const result = await cn.query(Queries.GET_ALL_BOOKS);
      cn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get books ${error}`);
    }
  }
  async show(id: number): Promise<Book> {
    try {
      const cn = await Client.connect();
      const result = await cn.query(Queries.GET_BOOK_BY_ID, [id]);
      cn.release();
      const book_result = result.rows[0];
      return book_result;
    } catch (error) {
      throw new Error(`Could not find book ${id}. Error: ${error}`);
    }
  }
  async create(book: Book): Promise<Book> {
    try {
      const cn = await Client.connect();
      const result = await cn.query(Queries.CREATE_BOOK, [
        book.title,
        book.author,
        book.type,
        book.summary,
        book.total_pages,
      ]);
      cn.release();
      const book_result = result.rows[0];
      return book_result;
    } catch (error) {
      throw new Error(`Could not insert a book, Error:${error}`);
    }
  }
  /* update need a lot more implementation, here I am just update the title. */
  async update(id: number): Promise<Book> {
    try {
      const input = [id, "test"];
      const cn = await Client.connect();
      const result = await cn.query(Queries.UPDATE_BOOK_TITLE, input);
      cn.release();
      const book = result.rows[0];
      return book;
    } catch (error) {
      throw new Error(`Could not update book ${id}, Error: ${error}`);
    }
  }

  async delete(id: number): Promise<Book> {
    try {
      const cn = await Client.connect();
      const result = await cn.query(Queries.DELETE_BOOK, [id]);
      cn.release();
      const book = result.rows[0];
      return book;
    } catch (error) {
      throw new Error(`Could not delete book ${id}, Error: ${error}`);
    }
  }
}

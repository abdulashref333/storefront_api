import { BookStore } from "../books";

const bookStore = new BookStore();

describe("Book Store Model", () => {
  it("should find index method", () => {
    expect(bookStore.index).toBeDefined();
  });

  it("index method should return a list of books", async () => {
    const books = await bookStore.index();
    expect(books).toEqual([]);
  });
});

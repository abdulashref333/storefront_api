export default {
  GET_ALL_BOOKS: `SELECT * FROM books;`,
  GET_BOOK_BY_ID: `SELECT * FROM books WHERE id=($1);`,
  CREATE_BOOK: `INSERT INTO books(title, author, b_type, summary, total_pages) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
  UPDATE_BOOK_TITLE: `UPDATE books set title = $2 WHERE id=($1) ;`,
  DELETE_BOOK: `DELETE FROM books WHERE id = $1;`,
  CREATE_USER: `INSERT INTO users(username, password_digest) VALUES($1, $2) RETURNING *;`,
  GET_USER_BY_USERNAME: `SELECT * FROM users WHERE username=$1`,
};

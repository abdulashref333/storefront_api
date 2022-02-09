import Client from "../database";
import Queries from "../queries";
import bcrypt from "bcrypt";

// import { IModel } from "../controller/handlerFactory";

export type User = {
  id: string;
  password: string;
  username: string;
};

const pepper = process.env.PEPPER;
const salt_rounds = process.env.SALT_ROUND;

export class UserStore {
  async create(user: Omit<User, "id">): Promise<User> {
    try {
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(salt_rounds as string)
      );
      console.log({ hash });
      const cn = await Client.connect();
      const result = await cn.query(Queries.CREATE_USER, [user.username, hash]);
      cn.release();
      console.log({ result });
      const book_result = result.rows[0];
      console.log({ book_result });
      return book_result;
    } catch (error) {
      throw new Error(`Could not insert a book, Error:${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const cn = await Client.connect();
      const result = await cn.query(Queries.GET_USER_BY_USERNAME, [username]);
      // if user not founded return null.
      if (result.rows.length) {
        const user = result.rows[0];

        console.log(user);

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          delete user.password_digest;
          return user;
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Could not authenticate, Error:${error}`);
    }
  }
}

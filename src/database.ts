import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const ENV = process.env.ENV;
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_USER,
} = process.env;

// client it's the connection to the postgres or just a collection of many connections.
// it's a pool of ready threads.
let client: Pool;

if (ENV === "dev") {
  console.log("i am here.");

  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;

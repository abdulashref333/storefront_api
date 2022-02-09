import express from "express";
import { Request, Response } from "express";
import books from "./api/book";
import { userRoutes } from "../controller/user.controller";
const app = express();

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome!");
});

app.use("/books", books);
userRoutes(app);
export default app;

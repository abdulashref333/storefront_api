import express, { Request, Response } from "express";
import { UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "../utils/verfyAuthToken";
import { generatToken } from "../utils/generatToken";

export function userRoutes(app: express.Application) {
  app
    .post("/users", verifyAuthToken, createBook)
    .post("/users/auth", authenticate);
}

const user = new UserStore();

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("ho are yu");
    const result = await user.create(req.body);

    const token = generatToken({ username: result.username, id: result.id });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const result = await user.authenticate(req.body.username, req.body.password);
  if (result) {
    const token = generatToken({ username: result.username, id: result.id });
    res.json({ token });
    return;
  }
  res.json({ result });
};

import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    console.log("i am on auth verify.");
    const token = req.headers.authorization?.split(" ")[1];
    const result = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    // console.log({ token });
    // console.log({ result });
    next();
  } catch (error) {
    res.status(401).json({ error: "Acess denied!" });
  }
};

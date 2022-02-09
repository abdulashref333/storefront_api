import jwt from "jsonwebtoken";

interface IPayload {
  username: string;
  id: string;
}
export const generatToken = (payload: IPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

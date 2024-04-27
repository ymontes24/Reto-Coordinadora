import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { environment } from "../DB/config/environmets";
import { User } from "../types/user.types";

export const jwtValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      environment.JWT_SECRET as string
    ) as User;
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../DB/db_connection";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [result]: any = await pool.execute(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (Array.isArray(result) && result.length > 0) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`
    );

    return res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

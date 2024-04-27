import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { User } from "../../types/user.types";

export const updateUser = async (req: Request, res: Response) => {
  const { id, rolesId, ...user } = req.body as User;

  try {
    const [result]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = ?`,
      [user.email]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    await pool.execute(
      `UPDATE users SET name = ?, lastName = ? WHERE idusers = ?`,
      [user.name, user.lastName, result[0].idusers]
    );

    return res.status(200).send("User updated successfully");
  } catch (error) {
    console.error({
      controller: "updateUser",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

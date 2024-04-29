import { Request, Response } from "express";
import pool from "../../DB/db_connection";

export const getAllUserRoles = async (req: Request, res: Response) => {
  try {
    const [result]: any = await pool.execute(`SELECT * FROM roles`);

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("Roles not found");
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error({
      controller: "getAllUserRoles",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export const deleteUser = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email } = req.query;

  try {
    const [result]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = ?`,
      [email]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    await pool.execute(`DELETE FROM users WHERE email = ?`, [email]);

    return res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error({
      controller: "deleteUser",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

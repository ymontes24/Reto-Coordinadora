import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { User } from "../../types/user.types";
import Joi from "joi";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string(),
  lastName: Joi.string(),
  user: Joi.object<JwtUser>().required(),
});

export const updateUser = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

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
      `UPDATE users SET
        name = IFNULL(?, name),
        lastName = IFNULL(?, lastName)
       WHERE idusers = ?`,
      [user.name || null, user.lastName || null, result[0].idusers]
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

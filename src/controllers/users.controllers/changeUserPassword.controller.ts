import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../DB/db_connection";
import Joi from "joi";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(4).alphanum().required(),
  user: Joi.object<JwtUser>().required(),
});

export const changeUserPassword = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {
    oldPassword,
    newPassword,
    user: { email },
  } = req.body;

  try {
    const [result]: any = await pool.execute(
      `SELECT password FROM users WHERE email = '${email}'`
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(oldPassword, result[0].password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.execute(
      `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`
    );

    return res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error({
      controller: "changeUserPassword",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../DB/db_connection";
import { User } from "../../types/user.types";
import { environment } from "../../DB/config/environmets";
import Joi from "joi";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  rolesId: Joi.array().items(Joi.number()).required(),
  user: Joi.object<JwtUser>().required(),
});

export const createUser = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { name, lastName, email, rolesId } = req.body as User;

  try {
    const [result]: any = await pool.execute(
      `SELECT email FROM users WHERE email = ?`,
      [email]
    );

    if (Array.isArray(result) && result.length > 0) {
      return res.status(400).send("User already exists");
    }

    const [rolesResult]: any = await pool.execute(`SELECT idroles FROM roles`);
    const dbRolesId = rolesResult.map((role: any) => role.idroles);

    const rolesExists = rolesId.every((id: number) => dbRolesId.includes(id));

    if (!rolesExists) {
      return res.status(400).send("Invalid role id");
    }

    const hashedPassword = await bcrypt.hash(
      environment.DEFAULT_PASSWORD as string,
      10
    );

    await pool.execute(
      `INSERT INTO users (name, lastName, email, password) VALUES ('${name}', '${lastName}', '${email}', '${hashedPassword}')`
    );

    const [userId]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = '${email}'`
    );

    const insertRolesQuery = rolesId
      .map((id: number) => `(${userId[0].idusers}, ${id})`)
      .join(", ");
    await pool.execute(
      `INSERT INTO user_roles (users_idusers, roles_idroles) VALUES ${insertRolesQuery}`
    );

    return res.status(201).send("User created successfully");
  } catch (error) {
    console.error({
      controller: "createUser",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../DB/db_connection";
import { User } from "../../types/user.types";
import { environment } from "../../DB/config/environmets";

export const createUser = async (req: Request, res: Response) => {
  const { name, lastName, email, rolesId } = req.body as User;

  try {
    const [result]: any = await pool.execute(
      `SELECT email FROM users WHERE email = '${email}'`
    );

    if (Array.isArray(result) && result.length > 0) {
      return res.status(400).send("User already exists");
    }

    //get roles from DB and check if rolesId exists

    const roles: any = await pool.execute(
      `SELECT id FROM roles WHERE id IN (${rolesId.join(",")})`
    );

    if (roles[0].length !== rolesId.length) {
      return res.status(400).send("Invalid role");
    }

    const hashedPassword = await bcrypt.hash(
      environment.DEFAULT_PASSWORD as string,
      10
    );

    await pool.execute(
      `INSERT INTO users (name, lastName, email, password) VALUES ('${name}', '${lastName}', '${email}', '${hashedPassword}')`
    );

    const [userId]: any = await pool.execute(
      `SELECT id FROM users WHERE email = '${email}'`
    );

    rolesId.forEach(async (roleId: string) => {
      await pool.execute(
        `INSERT INTO user_roles (userId, roleId) VALUES (${userId[0].id}, ${roleId})`
      );
    });

    return res.status(201).send("User created successfully");
  } catch (error) {}
};

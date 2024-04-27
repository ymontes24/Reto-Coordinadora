import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { UserRoles } from "../../types/user.types";

export const addUserRoles = async (req: Request, res: Response) => {
  const { email, rolesId } = req.body as UserRoles;

  try {
    const [result]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = ?`,
      [email]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    //validar silos rolesId ya existen en el usuario

    const [userRoles]: any = await pool.execute(
      `SELECT roles_idroles FROM user_roles WHERE users_idusers = ?`,
      [result[0].idusers]
    );

    const userRolesId = userRoles.map((role: any) => role.roles_idroles);

    const rolesUserExists = rolesId.every((id: number) =>
      userRolesId.includes(id)
    );

    if (rolesUserExists) {
      return res.status(400).send("Role already exists");
    }

    const [rolesResult]: any = await pool.execute(`SELECT idroles FROM roles`);
    const dbRolesId = rolesResult.map((role: any) => role.idroles);

    const rolesExists = rolesId.every((id: number) => dbRolesId.includes(id));

    if (!rolesExists) {
      return res.status(400).send("Invalid role id");
    }

    const insertRolesQuery = rolesId
      .map((id: number) => `(${result[0].idusers}, ${id})`)
      .join(", ");
    await pool.execute(
      `INSERT INTO user_roles (users_idusers, roles_idroles) VALUES ${insertRolesQuery}`
    );

    return res.status(201).send("Roles added successfully");
  } catch (error) {
    console.error({
      controller: "addUserRoles",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

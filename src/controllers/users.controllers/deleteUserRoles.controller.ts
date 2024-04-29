import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { UserRoles } from "../../types/user.types";
import Joi from "joi";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  email: Joi.string().email().required(),
  rolesId: Joi.array().items(Joi.number()).required(),
  user: Joi.object<JwtUser>().required(),
});

export const deleteUserRoles = async (req: Request, res: Response) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, rolesId } = req.body as UserRoles;

  try {
    const [result]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = ?`,
      [email]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    const [userRoles]: any = await pool.execute(
      `SELECT roles_idroles FROM user_roles WHERE users_idusers = ?`,
      [result[0].idusers]
    );

    const userRolesId = userRoles.map((role: any) => role.roles_idroles);

    const rolesUserExists = rolesId.every((id: number) =>
      userRolesId.includes(id)
    );

    if (!rolesUserExists) {
      return res.status(400).send("Role does not exist");
    }

    const deleteRolesQuery = rolesId
      .map(
        (id: number) =>
          `users_idusers = ${result[0].idusers} AND roles_idroles = ${id}`
      )
      .join(" OR ");
    await pool.execute(`DELETE FROM user_roles WHERE ${deleteRolesQuery}`);

    return res.status(200).send("Roles deleted successfully");
  } catch (error) {
    console.error({
      controller: "deleteUserRoles",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

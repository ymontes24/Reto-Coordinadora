import { Request, Response } from "express";
import pool from "../../DB/db_connection";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [result]: any = await pool.execute(
      `SELECT 
          users.idusers,
          users.email,
          users.name,
          users.lastName,          
          Group_concat(roles.idroles SEPARATOR ',') as roles
       FROM users
       JOIN user_roles ON users.idusers  = user_roles.users_idusers
       JOIN roles ON user_roles.roles_idroles = roles.idroles
       GROUP BY users.idusers;`
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("Users not found");
    }

    const users = result.map((user: any) => ({
      id: user.idusers,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      rolesId: user.roles.split(","),
    }));

    return res.status(200).send(users);
  } catch (error) {
    console.error({
      controller: "getAllUsers",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

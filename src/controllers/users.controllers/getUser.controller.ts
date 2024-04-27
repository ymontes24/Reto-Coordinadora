import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { User } from "../../types/user.types";

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.query;

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
       WHERE email = '${email}'
       GROUP BY users.idusers;`
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).send("User not found");
    }

    const user: User = {
      id: result[0].idusers,
      name: result[0].name,
      lastName: result[0].lastName,
      email: result[0].email,
      rolesId: result[0].roles.split(","),
    };

    return res.status(200).send(user);
  } catch (error) {
    console.error({
      controller: "getUser",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

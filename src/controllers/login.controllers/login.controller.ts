import { Request, Response } from "express";
import { LoginUser, UserLogged } from "../../types/login.types";
import { connection } from "../../DB/config/db_connection";
import jwt from "jsonwebtoken";
import { environment } from "../../DB/config/environmets";

export const loginUser = async (req: Request, res: Response) => {
  const userlogin: LoginUser = req.body;
  //get user from db with userlogin.email and his roles
  const db = await connection;
  const [result]: any = await db.query(
    `SELECT 
        users.idusers,
        users.email,
        users.password,
        Group_concat(roles.roleName SEPARATOR ',') as roles
     FROM users
     JOIN user_roles ON users.idusers  = user_roles.users_idusers
     JOIN roles ON user_roles.roles_idroles = roles.idroles
     WHERE email = '${userlogin.email}'
     GROUP BY users.idusers;`
  );

  db.destroy();

  if (!Array.isArray(result) || result.length === 0) {
    res.status(404).send("User not found");
  }

  const userLogged: UserLogged = {
    idusers: result[0].idusers,
    email: result[0].email,
    password: result[0].password,
    roles: result[0].roles.split(","),
  };

  if (userLogged.password !== userlogin.password) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign(userLogged, environment.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return res.status(200).send({
    token: token,
    user_email: userLogged.email,
  });
};

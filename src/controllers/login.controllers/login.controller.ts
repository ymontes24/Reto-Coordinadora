import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginUser, UserLogged } from "../../types/login.types";
import pool from "../../DB/db_connection";
import { environment } from "../../DB/config/environmets";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userlogin: LoginUser = req.body;
    const [result]: any = await pool.execute(
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

    if (!Array.isArray(result) || result.length === 0) {
      res.status(404).send("User not found");
    }

    const userLogged: UserLogged = {
      email: result[0].email,
      password: result[0].password,
      roles: result[0].roles.split(","),
    };

    const passwordMatch = await bcrypt.compare(
      userlogin.password,
      userLogged.password
    );

    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const { password, ...user } = userLogged;

    const token = jwt.sign(user, environment.JWT_SECRET as string, {
      expiresIn: "8h",
    });

    return res.status(200).send({
      token: token,
      user_email: userLogged.email,
    });
  } catch (error) {
    console.error({
      controller: "loginUser",
      error,
    });
    return res.status(500).send("Internal server error");
  }
};

import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { JwtUser } from "../../types/user.types";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { roles } = req.body.user;

    if (roles.includes("SuperAdmin")) {
      const [events]: any = await pool.query(
        `SELECT
          events.idevents,
          events.title,
          events.description,
          events.address,
          events.max_capacity, 
          events.event_date,
          events.lat,
          events.long,
          event_status.status_name as status,
          JSON_OBJECT(
            'email', users.email,
            'name', users.name,
            'lastName', users.lastName
          ) AS user_owner
         FROM
          events
         LEFT JOIN event_status ON events.event_status_idevent_status = event_status.idevent_status
         LEFT JOIN users ON events.users_idcreator = users.idusers`
      );
      return res.status(200).json(events);
    }

    if (roles.includes("Admin")) {
      const [users]: any = await pool.query(
        `SELECT idusers FROM users WHERE email = '${req.body.user.email}'`
      );

      const user_id = users[0].idusers;

      const [events]: any = await pool.query(
        `SELECT
          events.idevents,
          events.title,
          events.description,
          events.address,
          events.max_capacity, 
          events.event_date,
          events.lat,
          events.long,
          event_status.status_name as status,
          JSON_OBJECT(
            'email', users.email,
            'name', users.name,
            'lastName', users.lastName
          ) AS user_owner
         FROM
          events
         LEFT JOIN event_status ON events.event_status_idevent_status = event_status.idevent_status
         LEFT JOIN users ON events.users_idcreator = users.idusers
         WHERE users.idusers = ${user_id}`
      );
      return res.status(200).json(events);
    }
    return res.status(200).json();
  } catch (error) {
    console.error({
      controller: "getEvents",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

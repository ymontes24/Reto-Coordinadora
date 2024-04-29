import { Request, Response } from "express";
import pool from "../../DB/db_connection";
import { JwtUser } from "../../types/user.types";

export const getEventToAssist = async (req: Request, res: Response) => {
  try {
    const { email } = req.body.user as JwtUser;

    const [user]: any = await pool.execute(
      `SELECT idusers FROM users WHERE email = '${email}'`
    );

    const user_id = user[0].idusers;

    const [event]: any = await pool.execute(
      `SELECT
          JSON_OBJECT(
            'event', JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idevents', events.idevents,
                    'title', events.title,
                    'description', events.description,
                    'address', events.address,
                    'max_capacity', events.max_capacity,
                    'event_date', events.event_date,
                    'status', JSON_OBJECT(
                    'status_name', event_status.status_name
                    ),
                    'user_owner', JSON_OBJECT(
                    'email', users.email,
                    'name', users.name,
                    'lastName', users.lastName
                    )
                )
            )
        ) as events
        FROM assistants
        JOIN events ON assistants.events_idevents = events.idevents
        JOIN users ON events.users_idcreator = users.idusers
        JOIN event_status ON events.event_status_idevent_status = event_status.idevent_status
        WHERE assistants.users_idusers = ${user_id};
        `
    );

    if (!Array.isArray(event) || event.length === 0) {
      return res.status(404).json("Event not found");
    }

    return res.status(200).json(event[0]);
  } catch (error) {
    console.error({
      controller: "getEventToAssist",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";

const schema = Joi.object({
  idevents: Joi.number().required(),
});

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { idevents } = req.query;

    const [event]: any = await pool.execute(
      `SELECT 
        events.idevents,
        events.title,
        events.description,
        events.address,
        events.max_capacity, 
        events.event_date,
        JSON_OBJECT(
            'idevent_status', event_status.idevent_status,
            'status_name', event_status.status_name
        ) AS status,
        JSON_OBJECT(
            'email', users.email,
            'name', users.name,
            'lastName', users.lastName
        ) AS user_owner
       FROM events
       JOIN users ON events.users_idcreator = users.idusers
       JOIN event_status ON events.event_status_idevent_status = event_status.idevent_status
       WHERE events.idevents = ${idevents};`
    );

    if (!Array.isArray(event) || event.length === 0) {
      return res.status(404).json("Event not found");
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error({
      controller: "editEventStatus",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

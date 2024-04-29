import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { assistant } from "../../types/assitants.types";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  event: Joi.number().required(),
  assistant: Joi.number().required(),
  user: Joi.object<JwtUser>().required(),
});

export const addAssistantToEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { event, assistant } = req.body as assistant;

    const [assistantExistsOnUsers]: any = await pool.query(
      `SELECT * FROM users WHERE idusers = ?`,
      [assistant]
    );

    if (!assistantExistsOnUsers.length) {
      return res.status(400).json("Invalid assistant");
    }

    const [assistantExists]: any = await pool.query(
      `SELECT * FROM assistants WHERE events_idevents = ? AND users_idusers = ?`,
      [event, assistant]
    );

    if (assistantExists.length) {
      return res.status(400).json("Assistant already exists on event");
    }

    const [eventExists]: any = await pool.query(
      `SELECT
        events.idevents,
        events.max_capacity,
        COUNT(assistants.events_idevents) as assistants
        FROM
        events
       LEFT JOIN assistants ON events.idevents = assistants.events_idevents
       WHERE
        events.idevents = ?
       AND events.event_status_idevent_status = 1
       GROUP BY
        events.idevents`,
      [req.body.event]
    );

    if (!eventExists.length) {
      return res.status(400).json("Invalid event");
    }

    const maxCapacity = eventExists[0].max_capacity;
    const assistants = eventExists[0].assistants;

    if (assistants >= maxCapacity) {
      return res.status(400).json("Event is full");
    }

    await pool.query("INSERT INTO assistants SET ?", {
      events_idevents: event,
      users_idusers: assistant,
    });

    return res.status(201).json("Assistant added to event successfully");
  } catch (error) {
    console.error({
      controller: "addAssistantToEvent",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

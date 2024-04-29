import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { eventStatus } from "../../types/event.types";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  idevents: Joi.number().required(),
  status: Joi.number().required(),
  user: Joi.object<JwtUser>().required(),
});

export const editEventStatus = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { idevents, status } = req.body as eventStatus;

    const [eventExists]: any = await pool.execute(
      `SELECT * FROM events WHERE idevents = ?`,
      [idevents]
    );

    if (!eventExists.length) {
      return res.status(400).json("Invalid event");
    }

    const [statusExists]: any = await pool.execute(
      `SELECT * FROM event_status WHERE idevent_status = ?`,
      [status]
    );

    if (!statusExists.length) {
      return res.status(400).json("Invalid status");
    }

    await pool.execute(
      `UPDATE events SET event_status_idevent_status = ? WHERE idevents = ?`,
      [status, idevents]
    );

    return res.status(200).json("Event status updated successfully");
  } catch (error) {
    console.error({
      controller: "editEventStatus",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

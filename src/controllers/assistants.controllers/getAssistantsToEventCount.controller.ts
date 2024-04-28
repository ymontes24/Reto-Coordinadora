import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";

const schema = Joi.object({
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
});

export const getAssistantsToEventCount = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { start_date, end_date } = req.query;
    const [assistants]: any = await pool.query(
      `SELECT
        events.idevents,
        events.title,
        event_status.status_name as status,
        COUNT(assistants.events_idevents) as assistants
       FROM
        events
       LEFT JOIN assistants ON events.idevents = assistants.events_idevents
       LEFT JOIN event_status ON events.event_status_idevent_status = event_status.idevent_status
       WHERE
        events.event_date BETWEEN ? AND ?
       GROUP BY
       events.idevents`,
      [new Date(start_date as string), new Date(end_date as string)]
    );

    if (!assistants.length) {
      return res.status(404).json("No assistants found");
    }

    return res.status(200).json(assistants);
  } catch (error) {
    console.error({
      controller: "getAssistantsToEventCount",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

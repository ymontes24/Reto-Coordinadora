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

export const deleteAssistantToEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { event, assistant } = req.body as assistant;

    const [assistantExists]: any = await pool.query(
      `SELECT * FROM assistants WHERE events_idevents = ? AND users_idusers = ?`,
      [event, assistant]
    );

    if (!assistantExists.length) {
      return res.status(400).json("Assistant does not exists on event");
    }

    await pool.query(
      `DELETE FROM assistants WHERE events_idevents = ? AND users_idusers = ?`,
      [event, assistant]
    );

    return res.status(200).json("Assistant deleted from event");
  } catch (error) {
    console.error({
      controller: "deleteAssistantToEvent",
      stack: error,
    });
    return res.status(500).json("Internal server error");
  }
};

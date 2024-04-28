import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";

const schema = Joi.object({
  idevents: Joi.number().required(),
});

export const getAssistantsToEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { idevents } = req.query;

    const [assistants]: any = await pool.execute(
      `SELECT 
        JSON_OBJECT(
          'users', JSON_ARRAYAGG(
            JSON_OBJECT(
              'idusers', users.idusers,
              'email', users.email,
              'name', users.name,
              'lastName', users.lastName
            )
          )
        ) as assistants
       FROM assistants
       JOIN users ON assistants.users_idusers = users.idusers
       WHERE assistants.events_idevents = ${idevents}`
    );

    if (!Array.isArray(assistants) || assistants.length === 0) {
      return res.status(404).json("Assistants not found");
    }

    return res.status(200).json(assistants[0]);
  } catch (error) {
    console.error({
      controller: "getAssistantsToEvent",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

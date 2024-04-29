import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { event } from "../../types/event.types";
import { getGeoLocation } from "../../utils/mapbox.util";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  idevents: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
  address: Joi.string(),
  max_capacity: Joi.number().greater(0),
  event_date: Joi.date().greater("now"),
  user: Joi.object<JwtUser>().required(),
});

export const editEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { idevents, title, description, address, max_capacity, event_date } =
      req.body as event;

    const [long, lat] = address ? await getGeoLocation(address) : [null, null];

    if (address && (!long || !lat)) {
      return res.status(400).json("Invalid address");
    }

    await pool.execute(
      `UPDATE events SET
            title = IFNULL(?, title),
            description = IFNULL(?, description),
            address = IFNULL(?, address),
            max_capacity = IFNULL(?, max_capacity),
            event_date = IFNULL(?, event_date),
            \`lat\` = IFNULL(?, \`lat\`),
            \`long\` = IFNULL(?, \`long\`)    
         WHERE idevents = ?`,
      [
        title || null,
        description || null,
        address || null,
        max_capacity || null,
        event_date ? new Date(event_date) : null,
        lat || null,
        long || null,
        idevents,
      ]
    );

    return res.status(200).json("Event updated successfully");
  } catch (error) {
    console.error({
      controller: "editEvent",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

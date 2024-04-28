import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { getNearbyPlaces } from "../../utils/mapbox.util";

const schema = Joi.object({
  idevents: Joi.number().required(),
  distance: Joi.number().greater(0).required(),
});

export const getEventNearbyPlaces = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { idevents, distance } = req.query;

    const [result]: any = await pool.execute(
      `SELECT events.lat, events.long FROM events WHERE idevents = ?`,
      [idevents]
    );

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).json("Event not found");
    }

    const { lat, long } = result[0];

    const nearbyPlaces = await getNearbyPlaces(lat, long, Number(distance));

    return res.status(200).json(nearbyPlaces);
  } catch (error) {
    console.error({
      controller: "getEventNearbyPlaces",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

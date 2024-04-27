import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { nearbyEvent } from "../../types/event.types";
import { environment } from "../../DB/config/environmets";
import { JwtUser } from "../../types/user.types";

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

const getNearbyPlaces = async (lat: number, long: number, distance: number) => {
  try {
    const tilequeryURL = `${environment.MAPBOX_URL_TILEQUERY}${long},${lat}.json?radius=${distance}&access_token=${environment.MAPBOX_TOKEN}`;

    const response = await fetch(tilequeryURL);
    const data = await response.json();
    return data.features.map(
      (feature: {
        properties: { name: any; type: any };
        geometry: { coordinates: any };
      }) => ({
        name: feature.properties.name,
        type: feature.properties.type,
        coordinates: feature.geometry.coordinates,
      })
    );
  } catch (error) {
    console.error({
      controller: "getEventNearbyPlaces.getNearbyPlaces",
      stack: error,
    });
    return [];
  }
};

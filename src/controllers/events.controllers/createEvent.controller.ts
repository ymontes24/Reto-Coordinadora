import { Request, Response } from "express";
import Joi from "joi";
import pool from "../../DB/db_connection";
import { event } from "../../types/event.types";
import { environment } from "../../DB/config/environmets";
import { JwtUser } from "../../types/user.types";

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  address: Joi.string().required(),
  max_capacity: Joi.number().greater(0).required(),
  event_date: Joi.date().greater("now").required(),
  user: Joi.object<JwtUser>().required(),
});

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { title, description, address, max_capacity, event_date } =
      req.body as event;

    const user = req.body.user as JwtUser;

    const [longitude, latitude] = await getGeoLocation(address);

    if (!longitude || !latitude) {
      return res.status(400).json("Invalid address");
    }

    const [userID]: any = await pool.query(
      "SELECT idusers FROM users WHERE email = ?",
      [user.email]
    );

    await pool.query("INSERT INTO events SET ?", {
      title,
      description,
      address,
      max_capacity,
      event_date: new Date(event_date),
      long: longitude,
      lat: latitude,
      event_status_idevent_status: 1,
      users_idcreator: userID[0].idusers,
    });

    return res.status(201).json("Event created successfully");
  } catch (error) {
    console.error({
      controller: "createEvent",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

const getGeoLocation = async (address: string) => {
  try {
    const geocodeURL = `${environment.MAPBOX_URL_GEOCODIGN}${encodeURIComponent(
      address
    )}.json?access_token=${environment.MAPBOX_TOKEN}`;
    const response = await fetch(geocodeURL);
    const data = await response.json();
    return data.features[0].geometry.coordinates;
  } catch (error) {
    console.error({
      controller: "createEvent.getGeoLocation",
      stack: error,
    });
    return null;
  }
};

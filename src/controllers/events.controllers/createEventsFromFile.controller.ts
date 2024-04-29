import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { xlsToJson } from "../../utils/xlsToJson";
import { JwtUser } from "../../types/user.types";
import pool from "../../DB/db_connection";
import { environment } from "../../DB/config/environmets";
import { getGeoLocation } from "../../utils/mapbox.util";

export const createEventsFromFile = async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).send("Access denied. No token provided");
    }

    const decoded = jwt.verify(
      token.split(" ")[1],
      environment.JWT_SECRET as string
    ) as JwtUser;

    const [userID]: any = await pool.query(
      "SELECT idusers FROM users WHERE email = ?",
      [decoded.email]
    );

    const file = req.files as Express.Multer.File[];

    let events: {
      title: any;
      description: any;
      address: any;
      event_date: Date;
      max_capacity: any;
    }[];

    try {
      events = await xlsToJson(file[0].buffer);
    } catch (error) {
      return res.status(400).json("Invalid file format");
    }

    const eventsToInsert = events.map((event) => {
      return {
        ...event,
        users_idcreator: userID[0].idusers,
        event_status_idevent_status: 1,
      };
    });

    const eventsWithNullValues = eventsToInsert.filter((event) => {
      return event !== null;
    });

    eventsWithNullValues.shift();

    const _events = await Promise.all(
      eventsWithNullValues.map(async (event) => {
        const [longitude, latitude] = await getGeoLocation(event.address);

        return {
          ...event,
          lat: latitude,
          long: longitude,
        };
      })
    );

    const result = await Promise.allSettled(
      _events.map((event) => {
        return pool.query("INSERT INTO events SET ?", event);
      })
    );

    const failedEvents = result
      .map((res, index) => {
        if (res.status === "rejected") {
          return {
            event: events[index],
            reason: res.reason.message,
          };
        }
      })
      .filter((event) => event);

    if (failedEvents.length === events.length) {
      return res.status(400).json("All events failed");
    }

    return res.status(200).json(failedEvents);
  } catch (error) {
    console.error({
      controller: "createEventsFromFile",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

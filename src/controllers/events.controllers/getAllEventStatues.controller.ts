import { Request, Response } from "express";
import pool from "../../DB/db_connection";

export const getAllEventStatues = async (req: Request, res: Response) => {
  try {
    const [result]: any = await pool.execute(`SELECT * FROM event_status`);

    return res.status(200).json(result);
  } catch (error) {
    console.error({
      controller: "getAllEventStatues",
      stack: error,
    });
    return res.status(500).json("Server Error");
  }
};

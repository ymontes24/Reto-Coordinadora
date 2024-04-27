import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { connection } from "./DB/config/db_connection";

//init simple server with express
dotenv.config();
const app = express();
const port = 3000;

// const db = await connection;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

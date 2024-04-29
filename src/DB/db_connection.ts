import mysql from "mysql2/promise";
import { environment } from "./config/environmets";

const pool = mysql.createPool({
  host: environment.DATABASE_HOST,
  port: environment.DATABASE_PORT,
  user: environment.DATABASE_USER,
  password: environment.DATABASE_PASSWORD,
  database: environment.DATABASE_SCHEMA,
});

export default pool;

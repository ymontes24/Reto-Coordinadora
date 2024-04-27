import express from "express";
import * as dotenv from "dotenv";
import * as users from "./routes/user.routes/user.routes";
import * as login from "./routes/login.routes/login.routes";
import { connection } from "./DB/config/db_connection";

//init simple server with express

const app = express();
const port = 3000;
dotenv.config();
// const db = await connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", login.loginRoutes);
app.use("/", users.userRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

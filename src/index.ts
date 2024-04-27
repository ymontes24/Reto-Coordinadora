import express from "express";
import { environment } from "./DB/config/environmets";
import * as users from "./routes/user.routes/user.routes";
import * as login from "./routes/login.routes/login.routes";
import { jwtValidation } from "./middlewares/jwtValidation.middleware";

const app = express();
const port = environment.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", login.loginRoutes);
app.use("/", jwtValidation, users.userRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

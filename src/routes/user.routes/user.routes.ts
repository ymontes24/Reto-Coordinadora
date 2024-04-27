import express from "express";
import * as UserController from "../../controllers/users.controllers/getUser.controller";

const router = express.Router();
export const userRoutes = router;
router.get("/users", UserController.getUser);

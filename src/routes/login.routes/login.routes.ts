import express from "express";
import * as LoginController from "../../controllers/login.controllers/login.controller";

const router = express.Router();
export const loginRoutes = router;

router.post("/login", LoginController.loginUser);

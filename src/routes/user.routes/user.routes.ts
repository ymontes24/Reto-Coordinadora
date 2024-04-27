import express from "express";
import * as UserController from "../../controllers/users.controllers/index";

const router = express.Router();
export const userRoutes = router;

router.put("/users/changePassword", UserController.changeUserPassword);
router.get("/users", UserController.getUser);

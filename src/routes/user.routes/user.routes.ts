import express from "express";
import * as UserController from "../../controllers/users.controllers/index";
import {
  superAdminValidation,
  adminValidation,
  userValidation,
} from "../../middlewares/roleValidation.middleware";

const router = express.Router();
export const userRoutes = router;

router.post("/users", adminValidation, UserController.createUser);
router.get("/users", userValidation, UserController.getUser);
router.get("/users/all", adminValidation, UserController.getAllUsers);
router.put("/users", adminValidation, UserController.updateUser);
router.delete("/users", adminValidation, UserController.deleteUser);
router.put(
  "/users/addRoles",
  superAdminValidation,
  UserController.addUserRoles
);
router.delete(
  "/users/deleteRoles",
  superAdminValidation,
  UserController.deleteUserRoles
);
router.put(
  "/users/changePassword",
  userValidation,
  UserController.changeUserPassword
);
router.get("/users/roles", adminValidation, UserController.getAllUserRoles);

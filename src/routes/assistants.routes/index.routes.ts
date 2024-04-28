import express from "express";
import * as AssitantsController from "../../controllers/assistants.controllers";
import {
  superAdminValidation,
  adminValidation,
  userValidation,
} from "../../middlewares/roleValidation.middleware";

const router = express.Router();
export const assistantsRoutes = router;

router.post(
  "/assistant",
  userValidation,
  AssitantsController.addAssistantToEvent
);
router.get(
  "/assistant",
  adminValidation,
  AssitantsController.getAssistantsToEvent
);
router.delete(
  "/assistant",
  userValidation,
  AssitantsController.deleteAssistantToEvent
);

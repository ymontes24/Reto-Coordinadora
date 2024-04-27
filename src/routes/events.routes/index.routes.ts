import express from "express";
import * as createEventController from "../../controllers/events.controllers";
import {
  superAdminValidation,
  adminValidation,
  userValidation,
} from "../../middlewares/roleValidation.middleware";

const router = express.Router();
export const eventRoutes = router;

router.post("/event", createEventController.createEvent);
router.get(
  "/event/nearby",
  userValidation,
  createEventController.getEventNearbyPlaces
);

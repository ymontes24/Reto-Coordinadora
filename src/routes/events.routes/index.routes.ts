import express from "express";
import multer from "multer";
import * as createEventController from "../../controllers/events.controllers";
import {
  superAdminValidation,
  adminValidation,
  userValidation,
} from "../../middlewares/roleValidation.middleware";

const router = express.Router();
export const eventRoutes = router;

const storage = multer();

router.post("/event", adminValidation, createEventController.createEvent);
router.post(
  "/event/upload",
  adminValidation,
  storage.any(),
  createEventController.createEventsFromFile
);
router.get("/event", adminValidation, createEventController.getEvent);
router.get(
  "/event/nearby",
  userValidation,
  createEventController.getEventNearbyPlaces
);
router.put("/event", adminValidation, createEventController.editEvent);
router.get(
  "/event/status",
  adminValidation,
  createEventController.getAllEventStatues
);
router.put(
  "/event/status",
  adminValidation,
  createEventController.editEventStatus
);
router.get(
  "/event/assist",
  userValidation,
  createEventController.getEventToAssist
);
router.get("/events", adminValidation, createEventController.getEvents);

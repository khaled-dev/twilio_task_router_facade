import express from "express";
import controller from "../controllers/task.controller";
import { createTaskValidationSchema } from "../middlewares/validations/task.validation.schema";
import { ValidateJoi } from "../middlewares/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(createTaskValidationSchema),
  controller.create,
);

export = router;

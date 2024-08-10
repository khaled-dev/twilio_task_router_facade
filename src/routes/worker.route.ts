import express from "express";
import controller from "../controllers/worker.controller";
import { createWorkerValidationSchema } from "../middlewares/validations/worker.validation.schema";
import { ValidateJoi } from "../middlewares/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(createWorkerValidationSchema),
  controller.create,
);

export = router;

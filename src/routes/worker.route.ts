import express from "express";
import controller from "../controllers/worker.controller";
import { createWorkerValidationSchema } from "../middlewares/validations/worker.validation.schema";
import { ValidateJoi } from "../middlewares/Joi";

const router = express.Router();

router.get("/", controller.index);
router.get("/:sid", controller.show);
router.post(
  "/create",
  ValidateJoi(createWorkerValidationSchema),
  controller.create,
);
router.get("/:sid/token", controller.generateToken);
router.delete("/:sid", controller.destroy);

export = router;

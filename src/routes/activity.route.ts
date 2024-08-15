import express from "express";
import controller from "../controllers/activity.controller";

const router = express.Router();

router.get(
  "/",
  controller.index,
);

router.get(
  "/:sid",
  controller.show,
);

export = router;

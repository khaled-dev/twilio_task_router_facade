import express from "express";
import controller from "../controllers/task.controller";

const router = express.Router();

router.post("/create", controller.create);

export = router;

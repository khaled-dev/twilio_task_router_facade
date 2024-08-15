import express, { Express } from "express";
import { config } from "dotenv";
import Logger from "./config/logger";
import taskRoutes from "./routes/task.route";
import workerRoutes from "./routes/worker.route";
import activityRoutes from "./routes/activity.route";
import loggerMiddleware from "./middlewares/logger.middleware";
import exceptionHandlerMiddleware from "./middlewares/exception_handler.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

// load env variables
config();

const server: Express = express();
const port: string = process.env.SERVER_PORT!;

server.use(express.json());
server.use(loggerMiddleware);
server.use(authMiddleware);

server.use("/tasks", taskRoutes);
server.use("/workers", workerRoutes);
server.use("/activities", activityRoutes);

server.use(exceptionHandlerMiddleware);

server.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});

export default server;

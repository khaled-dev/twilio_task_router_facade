import express, { Express } from "express";
import { config } from "dotenv";
import Logger from "./config/logger";
import taskRoutes from "./routes/task.route";
import loggerMiddleware from "./middlewares/logger.middleware";
import exceptionHandlerMiddleware from "./middlewares/exception_handler.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

// load env variables
config();

const server: Express = express();
const port: number = process.env.SERVER_PORT || 4000;

server.use(express.json());
server.use(loggerMiddleware);
server.use(authMiddleware);

server.use("/tasks", taskRoutes);

server.use(exceptionHandlerMiddleware);

server.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});

import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import Logs from "./config/logs";
import loggerMiddleware from "./middlewares/logger.middleware"

// load env variables
config();

const server: Express = express();
const port: number = process.env.SERVER_PORT || 4000;

server.use(loggerMiddleware);


server.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

server.listen(port, () => {
  Logs.info(`Server is running on port ${port}`);
});

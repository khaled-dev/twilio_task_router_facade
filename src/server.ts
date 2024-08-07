import express, { Express, Request, Response } from "express";
import { config } from "dotenv";

// load env variables
config();

const server: Express = express();
const port: number = process.env.SERVER_PORT || 4000;

server.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

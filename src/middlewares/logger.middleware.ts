import { Request, Response, NextFunction } from "express";
import Logger from "../config/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bodyData: string = JSON.stringify(req.body) ?? "no body";

  Logger.info(`${req.method} ${req.path} - ${bodyData}`);

  next();
};

export default loggerMiddleware;

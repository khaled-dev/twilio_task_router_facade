import { Request, Response, NextFunction } from "express";
import response from "../controllers/concerns/response";
import Logger from "../config/logger";
import {Locale} from "../config/locale";

const exceptionHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }
  Logger.error(err.stack ?? err.message);

  response.error(res, { message: err.message }, Locale.http.Internal, 500);
};

export default exceptionHandlerMiddleware;

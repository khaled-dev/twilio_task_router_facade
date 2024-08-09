import { NextFunction, Request, Response } from "express";
import Logger from "../config/logger";
import response from "../controllers/concerns/response";
import jwt from "jsonwebtoken";
import {Locale} from "../config/locale";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | string[] | undefined = req.headers["mit-ms-token"];

  if (!token || typeof token !== "string") {
    return response.error(res, {}, Locale.http.Unauthorized, 401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    Logger.error(err.message);
    return response.error(res, { message: err.message }, Locale.http.Unauthorized, 401);
  }

  next();
};

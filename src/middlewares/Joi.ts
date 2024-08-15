import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import response from "../controllers/concerns/response";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      return response.validation(
        res,
        error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
      );
    }
  };
};

import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import response from "../controllers/concerns/response";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void|any> => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error: any) {
      return response.validation(
        res,
        error.details.map((detail: any) => ({
          message: detail.message,
          path: detail.path,
        })),
      );
    }
  };
};

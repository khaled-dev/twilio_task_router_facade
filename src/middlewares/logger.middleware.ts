import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bodyData: string = JSON.stringify(req.body) ?? "no body";

  console.log(`${req.method} ${req.path} - ${bodyData}`); // Log method, path, and body
  next(); // Pass control to the next middleware function
};

export default loggerMiddleware;

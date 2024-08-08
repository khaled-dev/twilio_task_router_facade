import { Response } from "express";

const success = (
  res: Response,
  data: object = {},
  message = "Request successful.",
  status = 200,
): Response => {
  return res.status(status).json({
    message,
    data,
    status,
  });
};

const error = (
  res: Response,
  error: object = {},
  message = "Request Failed",
  status = 500,
): Response => {
  return res.status(status).json({
    message,
    error,
    status,
  });
};

const validation = (
  res: Response,
  error: object = {},
  message = "Bad Request",
  status = 422,
): Response => {
  return res.status(status).json({
    message,
    error,
    status,
  });
};

export default { success, error, validation };

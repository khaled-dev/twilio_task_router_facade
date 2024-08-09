import { Request } from "express";

export interface ICreateTaskRequest extends Request {
  body: {
    attributes: object;
  };
}

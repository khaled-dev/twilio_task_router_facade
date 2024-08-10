import { Request } from "express";

export interface ICreateWorkerRequest extends Request {
  body: {
    attributes: object;
    friendly_name: string;
  };
}

export interface IShowWorkerRequest extends Request {
  params: {
    sid: string;
  };
}

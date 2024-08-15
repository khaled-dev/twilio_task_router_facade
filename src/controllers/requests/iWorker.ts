import { Request } from "express";

export interface ICreateWorkerRequest extends Request {
  body: {
    attributes: object;
    friendly_name: string;
  };
}

export interface IIndexWorkerRequest extends Request {}

export interface IShowWorkerRequest extends Request {
  params: {
    sid: string;
  };
}

export interface IUpdateWorkerActivityRequest extends Request {
  params: {
    sid: string;
  };
  body: {
    activitySid: string;
  };
}

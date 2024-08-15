import { Request } from "express";

export interface IShowActivityRequest extends Request {
  params: {
    sid: string;
  };
}

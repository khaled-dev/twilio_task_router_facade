import { Response } from "express";
import response from "./concerns/response";
import workerView from "../views/worker.view";
import workerService from "../services/worker.service";
import {
  WorkerContext,
  WorkerInstance,
} from "twilio/lib/rest/taskrouter/v1/workspace/worker";
import { Locale } from "../config/locale";
import { ICreateWorkerRequest, IShowWorkerRequest } from "./requests/iWorker";

const create = async (
  req: ICreateWorkerRequest,
  res: Response,
): Promise<void> => {
  let worker: WorkerInstance;
  try {
    worker = await workerService.createWorker(
      req.body.friendly_name,
      req.body.attributes,
    );
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(res, workerView.one(worker), Locale.workers.create.success);
};

const show = async (req: IShowWorkerRequest, res: Response): Promise<void> => {
  let worker: WorkerContext;
  try {
    worker = await workerService.find(req.params.sid);
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(res, workerView.one(worker), Locale.workers.show.success);
};

export default { create, show };

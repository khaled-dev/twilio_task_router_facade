import { Response, Request } from "express";
import response from "./concerns/response";
import workerView from "../views/worker.view";
import workerService from "../services/worker.service";
import {
  WorkerInstance,
  WorkerListInstance,
} from "twilio/lib/rest/taskrouter/v1/workspace/worker";
import { Locale } from "../config/locale";
import {
  ICreateWorkerRequest,
  IShowWorkerRequest,
  IUpdateWorkerActivityRequest,
} from "./requests/iWorker";

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
  let worker: WorkerInstance;
  try {
    worker = await workerService.findBySid(req.params.sid);
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

const index = async (req: Request, res: Response): Promise<void> => {
  let workers: WorkerListInstance;
  try {
    workers = await workerService.all();
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(
    res,
    await workerView.many(workers),
    Locale.workers.index.success,
  );
};

const generateToken = (
  req: IShowWorkerRequest,
  res: Response,
): Promise<void> => {
  let worker: string;
  try {
    worker = workerService.generateToken(req.params.sid);
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(res, { workerToken: worker }, Locale.workers.show.success);
};

const destroy = async (
  req: IShowWorkerRequest,
  res: Response,
): Promise<void> => {
  let isDeleted: boolean;
  try {
    isDeleted = await workerService.destroy(req.params.sid);
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(res, { isDeleted: isDeleted }, Locale.workers.show.success);
};

const changeActivity = async (
  req: IUpdateWorkerActivityRequest,
  res: Response,
): Promise<void> => {
  let worker: WorkerInstance;
  try {
    worker = await workerService.updateActivity(
      req.params.sid,
      req.body.activitySid,
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

  response.success(res, workerView.one(worker), Locale.workers.show.success);
};

export default { create, show, index, generateToken, destroy, changeActivity };

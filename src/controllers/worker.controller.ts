import { Response } from "express";
import response from "./concerns/response";
import workerView from "../views/worker.view";
import workerService from "../services/worker.service";
import { WorkerInstance } from "twilio/lib/rest/taskrouter/v1/workspace/worker";
import { Locale } from "../config/locale";
import { ICreateWorkerRequest } from "./requests/iWorker";

const create = async (
    req: ICreateWorkerRequest,
    res: Response,
): Promise<void> => {
    let worker: WorkerInstance;
    try {
        worker = await workerService.createWorker(req.body.friendly_name, req.body.attributes);
    } catch (err) {
        response.error(
            res,
            { message: err.message },
            Locale.http.badRequest,
            err.status,
        );

        return
    }

    response.success(res, workerView.one(worker), Locale.workers.create.success);
};

export default { create };

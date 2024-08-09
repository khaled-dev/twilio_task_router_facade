import { Request, Response } from "express";
import response from "./concerns/response";
import taskView from "../views/task.view";
import taskService from "../services/task.service";
import { TaskInstance } from "twilio/lib/rest/taskrouter/v1/workspace/task";
import {Locale} from "../config/locale";
import {ICreateTaskRequest} from "./requests/iTask";

const create = async (req: ICreateTaskRequest, res: Response): Promise<void> => {
  const workflowSid: string = process.env.TWILIO_WORKFLOW_SID;

  let task: TaskInstance;
  try {
    task = await taskService.createTask(workflowSid, req.body.attributes);
  } catch (err) {
    response.error(res, { message: err.message }, Locale.http.badRequest, err.status);
  }

  response.success(
    res,
    taskView.one(task),
    Locale.tasks.create.success,
  );
};

export default { create };

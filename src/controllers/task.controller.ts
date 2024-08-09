import { Request, Response } from "express";
import response from "./concerns/response";
import taskView from "../views/task.view";
import taskService from "../services/task.service";
import { TaskInstance } from "twilio/lib/rest/taskrouter/v1/workspace/task";

const create = async (req: Request, res: Response): Promise<void> => {
  const workflowSid: string = process.env.TWILIO_WORKFLOW_SID;

  let task: TaskInstance;
  try {
    task = await taskService.createTask(workflowSid, {
      selected_language: "es",
    });
  } catch (err) {
    response.error(res, { message: err.message }, "Bad Request", err.status);
  }

  response.success(
    res,
    taskView.one(task),
    "Task has been created successfully",
  );
};

export default { create };

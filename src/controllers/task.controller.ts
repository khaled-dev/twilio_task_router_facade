import { Request, Response } from "express";
import response from "./concerns/response";
import taskView from "../views/task.view";
import taskService from "../services/task.service";
import { TaskInstance } from "twilio/lib/rest/taskrouter/v1/workspace/task";

const create = async (req: Request, res: Response) => {
  const workflowSid: string = process.env.TWILIO_WORKFLOW_SID;

  // TODO: handle attributes in a different place
  // attributes should be sent in the request
  // attributes should match the workflow's filters
  const task: TaskInstance = await taskService.createTask(
    workflowSid,
    '{"selected_language": "es"}',
  );

  response.success(
    res,
    taskView.one(task),
    "Task has been created successfully",
  );
};

export default { create };

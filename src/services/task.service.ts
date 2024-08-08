import TwilioClient from "./twilio.singleton";
import Logs from "../config/logs";
import { TaskInstance } from "twilio/lib/rest/taskrouter/v1/workspace/task";

async function createTask(
  workflowSid: string,
  attributes: string,
): Promise<TaskInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();

  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;
  let task: TaskInstance;
  try {
    task = await twilioClient
      .getClient()
      .taskrouter.v1.workspaces(workspaceSid)
      .tasks.create({ workflowSid, attributes });
  } catch (e) {
    Logs.error(e);
  }

  return task;
}

export default { createTask };

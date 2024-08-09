import TwilioClient from "./twilio.singleton";
import { TaskInstance } from "twilio/lib/rest/taskrouter/v1/workspace/task";

async function createTask(
  workflowSid: string,
  attributes: object,
): Promise<TaskInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;
  const attributesString: string = JSON.stringify(attributes);

  return await twilioClient
      .getClient()
      .taskrouter.v1.workspaces(workspaceSid)
      .tasks.create({ workflowSid, attributes: attributesString });
}

export default { createTask };

import TwilioClient from "./twilio.singleton";
import {
  WorkerContext,
  WorkerInstance,
} from "twilio/lib/rest/taskrouter/v1/workspace/worker";

async function createWorker(
  friendlyName: string,
  attributes: object,
): Promise<WorkerInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;
  const attributesString: string = JSON.stringify(attributes);

  // you can add "activitySid" to the create params
  return await twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers.create({ friendlyName, attributes: attributesString });
}

async function find(workerId: string): Promise<WorkerContext> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers.get(workerId);
}

export default { createWorker, find };

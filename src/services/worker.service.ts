import TwilioClient from "./twilio.singleton";
import {
  WorkerContext,
  WorkerInstance,
  WorkerListInstance,
} from "twilio/lib/rest/taskrouter/v1/workspace/worker";
import { workerCapability } from "./utilities /workerCapability.utility";

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

// find worker by sid
// NOTE: you can also find by name, get all workers then use each method to filter by any attribute
async function findBySid(workerId: string): Promise<WorkerContext> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers.get(workerId);
}

async function all(): Promise<WorkerListInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient.getClient().taskrouter.v1.workspaces(workspaceSid)
    .workers;
}

function generateToken(workerSid: string): string {
  return workerCapability.build(workerSid);
}

async function destroy(workerId: string): Promise<boolean> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers.get(workerId)
    .remove();
}

export default { createWorker, findBySid, all, generateToken, destroy };

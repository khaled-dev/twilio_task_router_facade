import TwilioClient from "./twilio.singleton";
import { WorkerInstance } from "twilio/lib/rest/taskrouter/v1/workspace/worker";
import { workerCapability } from "./utilities /workerCapability.utility";

async function create(
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
async function find(workerId: string): Promise<WorkerInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers(workerId)
    .fetch();
}

async function all(): Promise<WorkerInstance[]> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers.list();
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

async function updateActivity(
  workerId: string,
  activitySid: string,
): Promise<WorkerInstance> {
  return update(workerId, { activitySid });
}

async function update(
  workerId: string,
  payload: object,
): Promise<WorkerInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .workers(workerId)
    .update(payload);
}

export default {
  create,
  find,
  all,
  generateToken,
  destroy,
  updateActivity,
};

import TwilioClient from "./twilio.singleton";
import { ActivityInstance } from "twilio/lib/rest/taskrouter/v1/workspace/activity";

async function find(activitySid: string): Promise<ActivityInstance> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return await twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .activities(activitySid)
    .fetch();
}

async function all(): Promise<ActivityInstance[]> {
  const twilioClient: TwilioClient = TwilioClient.getInstance();
  const workspaceSid: string = process.env.TWILIO_WORKSPACE_SID;

  return await twilioClient
    .getClient()
    .taskrouter.v1.workspaces(workspaceSid)
    .activities.list();
}

export default { all, find };

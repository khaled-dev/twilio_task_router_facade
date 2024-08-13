import { Policy } from "twilio/lib/jwt/taskrouter/TaskRouterCapability";
import TwilioSDK from "twilio";
import TaskRouterCapability = TwilioSDK.jwt.taskrouter.TaskRouterCapability;
import util = TwilioSDK.jwt.taskrouter.util;

export class workerCapability {
  private static accountSid: () => string = () => {
    return process.env.TWILIO_ACCOUNT_SID;
  };
  private static authToken: () => string = () => {
    return process.env.TWILIO_AUTH_TOKEN;
  };
  private static workspaceSid: () => string = () => {
    return process.env.TWILIO_WORKSPACE_SID;
  };
  private static taskRouterBaseUrl = "https://taskrouter.twilio.com";
  private static version = "v1";

  private static buildWorkspacePolicy(options) {
    options = options || {};
    const resources = options.resources || [];
    const urlComponents = [
      this.taskRouterBaseUrl,
      this.version,
      "Workspaces",
      this.workspaceSid(),
    ];

    return new Policy({
      url: urlComponents.concat(resources).join("/"),
      method: options.method || "GET",
      allow: true,
    });
  }

  public static build(workerSid): string {
    const taskRouterCapability = new TaskRouterCapability({
      accountSid: this.accountSid(),
      authToken: this.authToken(),
      workspaceSid: this.workspaceSid(),
      channelId: workerSid,
    });

    const eventBridgePolicies = util.defaultEventBridgePolicies(
      this.accountSid(),
      workerSid,
    );
    const workerPolicies = util.defaultWorkerPolicies(
      this.version,
      this.workspaceSid(),
      workerSid,
    );

    const workspacePolicies = [
      // Workspace Activities Update Policy
      this.buildWorkspacePolicy({ resources: ["Activities"], method: "POST" }),
      // Workspace Activities Worker Reservations Policy
      this.buildWorkspacePolicy({
        resources: ["Workers", workerSid, "Reservations", "**"],
        method: "POST",
      }),
    ];

    eventBridgePolicies
      .concat(workerPolicies)
      .concat(workspacePolicies)
      .forEach((policy) => {
        taskRouterCapability.addPolicy(policy);
      });

    return taskRouterCapability.toJwt();
  }
}

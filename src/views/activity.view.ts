import {ActivityInstance} from "twilio/lib/rest/taskrouter/v1/workspace/activity";

const one = (activity: ActivityInstance): object => {
  return {
    activity
  };
};

const many = (activities: ActivityInstance[]): ActivityInstance[] => {
  return activities;
};

export default { one, many };

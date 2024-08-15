import {TaskInstance} from "twilio/lib/rest/taskrouter/v1/workspace/task";

const one = (task: TaskInstance): object => {
  return {
    task,
  };
};

const many = (tasks: TaskInstance[]) => {
  return tasks.map((task): object => {
    return {
      SID: task.sid,
    };
  });
};

export default { one, many };

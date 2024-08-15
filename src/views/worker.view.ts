import { WorkerInstance } from "twilio/lib/rest/taskrouter/v1/workspace/worker";

const one = (worker: WorkerInstance): object => {
  return {
    worker,
  };
};

const many = async (workers: WorkerInstance[]): Promise<WorkerInstance[]> => {
  return workers;
};

export default { one, many };

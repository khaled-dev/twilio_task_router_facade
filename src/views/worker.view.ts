import {
  WorkerContext,
  WorkerInstance,
  WorkerListInstance,
} from "twilio/lib/rest/taskrouter/v1/workspace/worker";

const one = (worker: WorkerInstance | WorkerContext): object => {
  return {
    worker,
  };
};

const many = async (workers: WorkerListInstance): Promise<WorkerInstance[]> => {
  const workersList: WorkerInstance[] = [];

  await workers.each((worker: WorkerInstance): void => {
    workersList.push(worker);
  });

  return workersList;
};

export default { one, many };

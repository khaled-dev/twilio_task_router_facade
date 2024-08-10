const one = (worker): object => {
  return {
    worker,
  };
};

const many = (workers) => {
  return workers.map((worker): object => {
    return {
      SID: worker.sid,
    };
  });
};

export default { one, many };

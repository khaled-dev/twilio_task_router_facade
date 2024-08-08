const one = (task): object => {
  return {
    task,
  };
};

const many = (tasks) => {
  return tasks.map((task): object => {
    return {
      SID: task.sid,
    };
  });
};

export default { one, many };

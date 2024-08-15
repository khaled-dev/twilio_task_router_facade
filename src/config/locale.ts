export interface ILocale {
  http: {
    badRequest: string;
    Unauthorized: string;
    Internal: string;
  };
  tasks: {
    create: {
      success: string;
      fail: string;
    };
  };
  activities: {
    show: {
      success: string;
      fail: string;
    };
    index: {
      success: string;
      fail: string;
    };
  };
  workers: {
    create: {
      success: string;
      fail: string;
    };
    show: {
      success: string;
      fail: string;
    };
    index: {
      success: string;
      fail: string;
    };
    token: {
      success: string;
      fail: string;
    };
  };
}

export const Locale: ILocale = {
  http: {
    badRequest: "Bad Request",
    Unauthorized: "Unauthorized",
    Internal: "Internal Error",
  },
  tasks: {
    create: {
      success: "Task has been created successfully",
      fail: "Fail to create task",
    },
  },
  activities: {
    show: {
      success: "activity response successfully",
      fail: "Fail to show activity",
    },
    index: {
      success: "activity response successfully",
      fail: "Fail to list activities",
    },
  },
  workers: {
    create: {
      success: "Worker has been created successfully",
      fail: "Fail to create worker",
    },
    show: {
      success: "Worker response successfully",
      fail: "Fail to show worker",
    },
    index: {
      success: "Worker response successfully",
      fail: "Fail to list worker",
    },
    token: {
      success: "Worker token generated successfully",
      fail: "Fail to generate worker token",
    },
  },
};

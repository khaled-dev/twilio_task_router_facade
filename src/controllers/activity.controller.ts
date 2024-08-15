import { Response, Request } from "express";
import response from "./concerns/response";
import activityView from "../views/activity.view";
import ActivityService from "../services/activity.service";
import { Locale } from "../config/locale";
import {IShowActivityRequest} from "./requests/iActivity";
import {ActivityInstance} from "twilio/lib/rest/taskrouter/v1/workspace/activity";

// activity controller and service
// list activities
// get one activity

// worker controller service
// set worker's activity

const index = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let activities: ActivityInstance[];
  try {
    activities = await ActivityService.all();
  } catch (err) {
    response.error(
      res,
      { message: err.message },
      Locale.http.badRequest,
      err.status,
    );

    return;
  }

  response.success(res, activityView.many(activities), Locale.activities.index.success);
};

const show = async (
    req: IShowActivityRequest,
    res: Response,
): Promise<void> => {
  let activity: ActivityInstance;
  try {
    activity = await ActivityService.find(req.params.sid);
  } catch (err) {
    response.error(
        res,
        { message: err.message },
        Locale.http.badRequest,
        err.status,
    );

    return;
  }

  response.success(res, activityView.one(activity), Locale.activities.show.success);
};


export default { index, show };

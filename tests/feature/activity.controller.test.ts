import request from "supertest";
import express from "express";
import controller from "../../src/controllers/activity.controller";
import ActivityService from "../../src/services/activity.service";
import response from "../../src/controllers/concerns/response";
import activityView from "../../src/views/activity.view";

jest.mock("../../src/services/activity.service", () => ({
  all: jest.fn(),
  find: jest.fn(),
}));

jest.spyOn(response, "success");
jest.spyOn(activityView, "many");
jest.spyOn(activityView, "one");

describe("Activity Controller", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get("/activities", controller.index);
    app.get("/activities/:sid", controller.show);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return all activities", async () => {
    const mockActivities = [{ sid: "ACT12345" }, { sid: "ACT67890" }];
    (ActivityService.all as jest.Mock).mockResolvedValue(mockActivities);

    await request(app)
      .get("/activities")
      .expect(200)
      .then(() => {
        expect(ActivityService.all).toHaveBeenCalled();
        expect(response.success).toHaveBeenCalled();
        expect(activityView.many).toHaveBeenCalledWith(
          expect.objectContaining(mockActivities),
        );
      });
  });

  it("should return activity by sid", async () => {
    const mockActivity = { sid: "ACT12345" };
    (ActivityService.find as jest.Mock).mockResolvedValue(mockActivity);

    await request(app)
      .get("/activities/" + mockActivity.sid)
      .expect(200)
      .then(() => {
        expect(ActivityService.find).toHaveBeenCalled();
        expect(response.success).toHaveBeenCalled();
        expect(activityView.one).toHaveBeenCalledWith(
          expect.objectContaining(mockActivity),
        );
      });
  });
});

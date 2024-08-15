import response from "../../src/controllers/concerns/response";
import taskView from "../../src/views/task.view";
import request from "supertest";
import express from "express";
import controller from "../../src/controllers/task.controller";
import { ValidateJoi } from "../../src/middlewares/Joi";
import { createTaskValidationSchema } from "../../src/middlewares/validations/task.validation.schema";

jest.mock("../../src/services/task.service", () => ({
  create: jest.fn().mockImplementation(async () => {
    return {
      sid: "TS1234567890abcdef",
      status: "pending",
      attributes: { selected_language: "es" },
    };
  }),
}));

jest.spyOn(response, "success");
jest.spyOn(response, "error");
jest.spyOn(taskView, "one");

describe("Task Creation Endpoint", () => {
  let app: express.Application;

  beforeEach(() => {
    process.env.SERVER_PORT = "4000";
    process.env.TWILIO_WORKFLOW_SID = "work_flow_sid";
    app = express();
    app.use(express.json());
    app.post(
      "/tasks",
      ValidateJoi(createTaskValidationSchema),
      controller.create,
    );
  });

  afterAll(() => {
    delete process.env.SERVER_PORT;
    delete process.env.TWILIO_WORKFLOW_SID;
    jest.clearAllMocks();
  });

  it("should create a task and respond with success", async () => {
    const mockAttributes = { selected_language: "es" };
    const mockReqBody = { attributes: { selected_language: "es" } };

    await request(app)
      .post("/tasks")
      .send(mockReqBody)
      .expect(200)
      .then(() => {
        expect(response.success).toHaveBeenCalled();
        expect(taskView.one).toHaveBeenCalledWith(
          expect.objectContaining({
            sid: "TS1234567890abcdef",
            status: "pending",
            attributes: mockAttributes,
          }),
        );
      });
  });
});

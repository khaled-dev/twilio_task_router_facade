import request from "supertest";
import express from "express";
import controller from "../../src/controllers/worker.controller";
import workerService from "../../src/services/worker.service";
import response from "../../src/controllers/concerns/response";
import workerView from "../../src/views/worker.view";
import { ValidateJoi } from "../../src/middlewares/Joi";
import {
  changeWorkerActivityValidationSchema,
  createWorkerValidationSchema,
} from "../../src/middlewares/validations/worker.validation.schema";
import { Locale } from "../../src/config/locale";

jest.mock("../../src/services/worker.service", () => ({
  all: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  generateToken: jest.fn(),
  destroy: jest.fn(),
  updateActivity: jest.fn(),
}));

jest.spyOn(response, "success");
jest.spyOn(workerView, "many");
jest.spyOn(workerView, "one");

describe("Worker Controller", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get("/workers", controller.index);
    app.post(
      "/workers",
      ValidateJoi(createWorkerValidationSchema),
      controller.create,
    );
    app.get("/workers/:sid", controller.show);
    app.delete("/workers/:sid", controller.destroy);
    app.get("/workers/:sid/token", controller.generateToken);
    app.put(
      "/workers/:sid/change-activity",
      ValidateJoi(changeWorkerActivityValidationSchema),
      controller.changeActivity,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return all workers", async () => {
    const mockWorkers = [{ sid: "ACT12345" }, { sid: "ACT67890" }];
    (workerService.all as jest.Mock).mockResolvedValue(mockWorkers);

    await request(app)
      .get("/workers")
      .expect(200)
      .then(() => {
        expect(workerService.all).toHaveBeenCalled();
        expect(response.success).toHaveBeenCalled();
        expect(workerView.many).toHaveBeenCalledWith(
          expect.objectContaining(mockWorkers),
        );
      });
  });

  it("should return worker by sid", async () => {
    const mockworker = { sid: "ACT12345" };
    (workerService.find as jest.Mock).mockResolvedValue(mockworker);

    await request(app)
      .get("/workers/" + mockworker.sid)
      .expect(200)
      .then(() => {
        expect(workerService.find).toHaveBeenCalledWith(mockworker.sid);
        expect(response.success).toHaveBeenCalled();
        expect(workerView.one).toHaveBeenCalledWith(
          expect.objectContaining(mockworker),
        );
      });
  });

  it("should create new worker", async () => {
    (workerService.create as jest.Mock).mockResolvedValue({
      sid: "TS1234567890abcdef",
      friendly_name: "test name",
      attributes: { selected_language: "es" },
    });

    const mockAttributes = { selected_language: "es" };
    const mockReqBody = {
      attributes: { selected_language: "es" },
      friendly_name: "test name",
    };

    await request(app)
      .post("/workers")
      .send(mockReqBody)
      .expect(200)
      .then(() => {
        expect(workerService.create).toHaveBeenCalledWith(
          "test name",
          mockAttributes,
        );
        expect(response.success).toHaveBeenCalled();
        expect(workerView.one).toHaveBeenCalledWith(
          expect.objectContaining({
            sid: "TS1234567890abcdef",
            friendly_name: "test name",
            attributes: mockAttributes,
          }),
        );
      });
  });

  it("should generate a token for a worker", async () => {
    const mockToken = "mockedtoken";
    (workerService.generateToken as jest.Mock).mockReturnValue(mockToken);

    await request(app)
      .get("/workers/WK1234567890/token")
      .expect(200)
      .then((res) => {
        expect(workerService.generateToken).toHaveBeenCalledWith(
          "WK1234567890",
        );
        expect(res.text).toBe(
          JSON.stringify({
            message: Locale.workers.token.success,
            data: { workerToken: mockToken },
            status: 200,
          }),
        );
      });
  });

  it("should delete a worker", async () => {
    const mockIsDeleted = true; // Assuming successful deletion
    (workerService.destroy as jest.Mock).mockResolvedValue(mockIsDeleted);

    await request(app)
      .delete("/workers/WK1234567890")
      .expect(200)
      .then((res) => {
        expect(workerService.destroy).toHaveBeenCalledWith("WK1234567890");
        expect(res.text).toBe(
          JSON.stringify({
            message: Locale.workers.delete.success,
            data: { isDeleted: true },
            status: 200,
          }),
        );
      });
  });

  it("should change the activity of a worker", async () => {
    const mockWorker = { sid: "WK1234567890" }; // Assuming successful update
    (workerService.updateActivity as jest.Mock).mockResolvedValue(mockWorker);

    await request(app)
      .put("/workers/WK1234567890/change-activity")
      .send({ activitySid: "ACT67890" }) // Assuming this is the payload structure
      .expect(200)
      .then(() => {
        expect(workerService.updateActivity).toHaveBeenCalledWith(
          "WK1234567890",
          "ACT67890",
        );

        // expect(response.success).toHaveBeenCalled();
        // expect(workerView.one).toHaveBeenCalledWith(
        //     expect.objectContaining(mockWorker),
        // );
      });
  });
});

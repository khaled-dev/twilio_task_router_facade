import response from "../../src/controllers/concerns/response";
import taskView from "../../src/views/task.view";
import request from "supertest";
import server from "../../src/server";

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
  beforeEach(() => {
    process.env.SERVER_PORT = "4000";
    process.env.TWILIO_WORKFLOW_SID = "work_flow_sid";
  });

  afterAll(() => {
    delete process.env.SERVER_PORT;
    delete process.env.TWILIO_WORKFLOW_SID;
    jest.clearAllMocks();
  });

  it("should create a task and respond with success", async () => {
    const mockAttributes = { selected_language: "es" };
    const mockReqBody = { attributes: { selected_language: "es" } };

    // Simulate a POST request to the /tasks endpoint
    await request(server)
      .post("/tasks")
      .send(mockReqBody)
      .expect(200) // Assuming a 200 OK response indicates success
      .then((res) => {
        expect(response.success).toHaveBeenCalled();
        // Verify that the taskView.one function was called with the expected arguments
        expect(taskView.one).toHaveBeenCalledWith(
          expect.objectContaining({
            sid: "TS1234567890abcdef",
            status: "pending",
            attributes: mockAttributes,
            // Add other verifications as needed
          }),
        );
      });
  });
});

import { describe, it, expect, vi } from "vitest";
import { postAttempt, getAttempts } from "./attempt-handlers.js";
import { insertAttempt, selectAttempts } from "./attempt-queries.js";
import type { PostAttemptReq, Attempt } from "./attempt-types.js";

// Mock the database query
vi.mock("./attempt-queries.js", () => ({
  insertAttempt: vi.fn(),
  selectAttempts: vi.fn(),
}));

describe("postAttempt", () => {
  const mockReqBody: PostAttemptReq = {
    userId: "1",
    quizId: "2",
    role: "Scrum Product Owner",
    questionsCount: 5,
    correctCount: 4,
  };

  const mockRequest = (postAttemptReq?: PostAttemptReq) => {
    return {
      body: postAttemptReq ? postAttemptReq : {},
    } as any;
  };

  const mockAttempt: Attempt = {
    id: "1",
    userId: "1",
    quizId: "2",
    role: "Scrum Product Owner",
    questionsCount: 5,
    correctCount: 4,
    createdAt: new Date(),
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("returns 400: Invalid request body", async () => {
    const req = mockRequest();
    // database query is skipped
    const res = mockResponse();

    await postAttempt(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid request body",
    });
  });

  it("returns 500: Failed to post attempt", async () => {
    const req = mockRequest(mockReqBody);
    vi.mocked(insertAttempt).mockRejectedValue(
      new Error("Failed to insert attempt"),
    );
    const res = mockResponse();

    await postAttempt(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to post attempt",
    });
  });

  it("returns 201: new attempt", async () => {
    const req = mockRequest(mockReqBody);
    vi.mocked(insertAttempt).mockResolvedValue(mockAttempt);
    const res = mockResponse();

    await postAttempt(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAttempt);
  });
});

describe("getAttempts", () => {
  const mockAttempts: Attempt[] = [
    {
      id: "1",
      userId: "1",
      quizId: "2",
      role: "Scrum Product Owner",
      questionsCount: 5,
      correctCount: 4,
      createdAt: new Date(),
    },
    {
      id: "2",
      userId: "1",
      quizId: "2",
      role: "Scrum Product Owner",
      questionsCount: 5,
      correctCount: 5,
      createdAt: new Date(),
    },
  ];

  const mockRequest = () => {
    return {} as any;
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("returns 500: Failed to get attempts", async () => {
    const req = mockRequest();
    vi.mocked(selectAttempts).mockRejectedValue(
      new Error("Failed to select attempts"),
    );
    const res = mockResponse();

    await getAttempts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to get attempts",
    });
  });

  it("returns 200: all quiz attempt history", async () => {
    const req = mockRequest();
    vi.mocked(selectAttempts).mockResolvedValue(mockAttempts);
    const res = mockResponse();

    await getAttempts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAttempts);
  });
});

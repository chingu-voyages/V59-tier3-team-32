import { describe, it, expect, vi } from "vitest";
import { getAttempts } from "./attempts-handlers.js";
import { selectAttempts } from "./attempts-queries.js";
import type { Attempt } from "./attempts-types.js";

// Mock the database query
vi.mock("./attempts-queries.js", () => ({
  selectAttempts: vi.fn(),
}));

describe("getAttempts", () => {
  const mockAttempts: Attempt[] = [
    {
      userId: "1",
      quizId: "2",
      createdAt: new Date(),
      role: "Scrum Product Owner",
      questionsCount: 5,
      correctCount: 4,
    },
    {
      userId: "1",
      quizId: "2",
      createdAt: new Date(),
      role: "Scrum Product Owner",
      questionsCount: 5,
      correctCount: 5,
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
    vi.mocked(selectAttempts).mockRejectedValue(
      new Error("Failed to select attempts"),
    );
    const req = mockRequest();
    const res = mockResponse();

    await getAttempts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to get attempts",
    });
  });

  it("returns 200: all quiz attempt history", async () => {
    vi.mocked(selectAttempts).mockResolvedValue(mockAttempts);
    const req = mockRequest();
    const res = mockResponse();

    await getAttempts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAttempts);
  });
});

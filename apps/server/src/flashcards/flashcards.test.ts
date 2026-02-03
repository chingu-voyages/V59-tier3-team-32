import { describe, it, expect, vi } from "vitest";
import { getFlashcards } from "./flashcards-handlers.js";
import { loadJsonFile } from "../fs/loadJsonFile.js";
import type { Role } from "../types/role.js";

// Mock the filesystem dependency
vi.mock("../fs/loadJsonFile.js", () => ({
  loadJsonFile: vi.fn(),
}));

describe("getFlashcards", () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("returns 200: flashcards grouped by role", async () => {
    const mockFlashcards: Role[] = [
      {
        role: "Scrum Product Owner",
        focus:
          "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
        flashcards: [],
      },
    ];

    vi.mocked(loadJsonFile).mockResolvedValue(mockFlashcards);
    const res = mockResponse();

    await getFlashcards({} as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFlashcards);
  });

  it("returns 500: Failed to load flashcards", async () => {
    vi.mocked(loadJsonFile).mockRejectedValue(new Error("Failed to read file"));
    const res = mockResponse();

    await getFlashcards({} as any, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to load flashcards",
    });
  });
});

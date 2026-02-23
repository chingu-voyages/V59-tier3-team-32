import { describe, it, expect, vi } from "vitest";
import { getFlashcards } from "./flashcards-handlers.js";
import { loadJsonFile } from "../fs/loadJsonFile.js";
import { RoleParam } from "../enums/roleParam.js";
import type { Role } from "../types/role.js";

// Mock the filesystem dependency
vi.mock("../fs/loadJsonFile.js", () => ({
  loadJsonFile: vi.fn(),
}));

describe("getFlashcards", () => {
  const mockFlashcards: Role[] = [
    {
      role: "Scrum Product Owner",
      focus:
        "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
      flashcards: [],
    },
    {
      role: "Scrum Master",
      focus:
        "Servant leadership, coaching, removing impediments (Aligns with CSM)",
      flashcards: [],
    },
  ];

  const mockRequest = (role?: string) => {
    return {
      query: role ? { role } : {},
    } as any;
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("returns 500: Failed to load flashcards", async () => {
    vi.mocked(loadJsonFile).mockRejectedValue(new Error("Failed to read file"));
    const req = mockRequest();
    const res = mockResponse();

    await getFlashcards(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to load flashcards",
    });
  });

  it("returns 400: No role parameter was provided", async () => {
    vi.mocked(loadJsonFile).mockResolvedValue(mockFlashcards);
    const req = mockRequest();
    const res = mockResponse();

    await getFlashcards(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "No role parameter was provided",
      allowedValues: Object.values(RoleParam),
    });
  });

  it("returns 400: Invalid role parameter", async () => {
    vi.mocked(loadJsonFile).mockResolvedValue(mockFlashcards);
    const req = mockRequest("test");
    const res = mockResponse();

    await getFlashcards(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid role parameter",
      allowedValues: Object.values(RoleParam),
    });
  });

  it("returns 200: flashcards grouped by role", async () => {
    vi.mocked(loadJsonFile).mockResolvedValue(mockFlashcards);
    const req = mockRequest("scrum_product_owner");
    const res = mockResponse();

    await getFlashcards(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        role: "Scrum Product Owner",
        focus:
          "Backlog management, maximizing value, stakeholder management (Aligns with CSPO)",
        flashcards: [],
      },
    ]);
  });
});

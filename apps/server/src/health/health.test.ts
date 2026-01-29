import { describe, it, expect, vi } from "vitest";
import { checkComponentsHealth } from "./health-handlers.js";
import { pingDb } from "../database/index.js";

// Mock the database dependency
vi.mock("../database/index.js", () => ({
  pingDb: vi.fn(),
}));

describe("checkComponentsHealth", () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("returns 200 when DB is UP", async () => {
    vi.mocked(pingDb).mockResolvedValue(true);
    const res = mockResponse();

    await checkComponentsHealth({} as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: "UP", database: "UP" });
  });

  it("returns 503 when DB is DOWN", async () => {
    vi.mocked(pingDb).mockResolvedValue(false);
    const res = mockResponse();

    await checkComponentsHealth({} as any, res);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ status: "DOWN", database: "DOWN" });
  });
});

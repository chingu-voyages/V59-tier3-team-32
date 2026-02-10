import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFlashcardQuestions } from "../lib/queries";
import { mockRoleDetails } from "./mockData";

vi.stubEnv("NEXT_PUBLIC_BACKEND_ORIGIN", "http://localhost:3000");

const fetchSpy = vi.spyOn(global, "fetch");

describe("getFlashcardQuestions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns parsed data on success", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockRoleDetails],
    } as Response);

    const result = await getFlashcardQuestions("Mathematician");
    expect(result).toEqual(mockRoleDetails);
    expect(fetchSpy).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/flashcards?role=Mathematician",
    );
  });

  it("throws error when response is not ok", async () => {
    fetchSpy.mockResolvedValueOnce({ ok: false } as Response);
    await expect(getFlashcardQuestions("dev")).rejects.toThrow(
      "Unable to fetch flashcard questions",
    );
  });
});

import type { Request, Response } from "express";
import { loadJsonFile } from "../fs/loadJsonFile.js";
import type { Role } from "../types/role.js";

// import from absolute file path
const FLASHCARDS_URL = new URL("../data/flashcards.json", import.meta.url);

export async function getFlashcards(_: Request, res: Response) {
  try {
    const flashcards = await loadJsonFile<Role[]>(FLASHCARDS_URL);
    res.status(200).json(flashcards);
  } catch {
    res.status(500).json({
      error: "Failed to load flashcards",
    });
  }
}

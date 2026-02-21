import type { Request, Response } from "express";
import { selectAttempts } from "./attempt-queries.js";

export async function getAttempts(_req: Request, res: Response) {
  try {
    const attempts = await selectAttempts();

    res.status(200).json(attempts);
  } catch {
    res.status(500).json({
      error: "Failed to get attempts",
    });
  }
}

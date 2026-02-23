import type { Request, Response } from "express";
import type { PostAttemptReq } from "./attempt-types.js";
import { insertAttempt, selectAttempts } from "./attempt-queries.js";

export async function postAttempt(req: Request, res: Response) {
  try {
    const {
      userId,
      quizId,
      role,
      questionsCount,
      correctCount,
    }: PostAttemptReq = req.body;

    if (
      typeof userId !== "string" ||
      typeof quizId !== "string" ||
      typeof role !== "string" ||
      typeof questionsCount !== "number" ||
      typeof correctCount !== "number"
    ) {
      res.status(400).json({
        error: "Invalid request body",
      });
      return;
    }

    const attempt = await insertAttempt({
      userId,
      quizId,
      role,
      questionsCount,
      correctCount,
    });

    res.status(201).json(attempt);
  } catch {
    res.status(500).json({
      error: "Failed to post attempt",
    });
  }
}

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

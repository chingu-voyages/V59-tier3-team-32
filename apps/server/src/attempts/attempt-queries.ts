import { desc } from "drizzle-orm";
import { makeDb, makeId } from "../database/index.js";
import { attempts } from "../database/schema.js";
import type { PostAttemptReq } from "./attempt-types.js";

export async function insertAttempt(postAttemptReq: PostAttemptReq) {
  try {
    const db = makeDb();

    const newAttempt = {
      id: makeId(),
      userId: postAttemptReq.userId,
      quizId: postAttemptReq.quizId,
      role: postAttemptReq.role,
      questionsCount: postAttemptReq.questionsCount,
      correctCount: postAttemptReq.correctCount,
    };

    await db.insert(attempts).values(newAttempt);

    return newAttempt;
  } catch {
    throw new Error("Failed to insert attempt");
  }
}

export async function selectAttempts() {
  try {
    const db = makeDb();

    const rows = await db
      .select()
      .from(attempts)
      .orderBy(desc(attempts.createdAt));

    return rows;
  } catch {
    throw new Error("Failed to select attempts");
  }
}

import { desc } from "drizzle-orm";
import { makeDb } from "../database/index.js";
import { attempts } from "../database/schema.js";

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

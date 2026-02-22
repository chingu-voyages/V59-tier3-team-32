import { asc, desc, eq, sql } from "drizzle-orm";
import { attempts } from "../attempts/attempt-schemas.js";
import { makeDb } from "../database/index.js";
import { roles } from "../quizzes/quiz-schemas.js";
import { users } from "../users/user-schemas.js";

// TODO: think about indexing (role_id, user_id)
export async function getLeaderboardRows(roleId: string) {
  const db = makeDb();
  const score = sql<number>`(${attempts.correctCount}::float / ${attempts.questionsCount}::float)`;

  const bestAttemptPerUser = db
    .selectDistinctOn([users.id], {
      userId: users.id,
      attemptId: attempts.id,
      userName: users.name,
      score: score,
      attemptNumber: attempts.attemptNumber,
      createdAt: attempts.createdAt,
    })
    .from(attempts)
    .where(eq(attempts.roleId, roleId))
    .innerJoin(users, eq(users.id, attempts.userId))
    .orderBy(users.id, desc(score), asc(attempts.attemptNumber))
    .as("best_attempt_per_user");

  return await db
    .select({
      attemptId: bestAttemptPerUser.attemptId,
      userName: bestAttemptPerUser.userName,
      score: bestAttemptPerUser.score,
      attemptNumber: bestAttemptPerUser.attemptNumber,
      createdAt: bestAttemptPerUser.createdAt,
    })
    .from(bestAttemptPerUser)
    .orderBy(
      desc(bestAttemptPerUser.score),
      asc(bestAttemptPerUser.attemptNumber),
      asc(bestAttemptPerUser.createdAt),
      asc(bestAttemptPerUser.attemptId),
    )
    .limit(10);
}

export async function getRoleBySlug(slug: string) {
  const [role] = await makeDb()
    .select()
    .from(roles)
    .where(eq(roles.slug, slug))
    .limit(1);

  return role;
}

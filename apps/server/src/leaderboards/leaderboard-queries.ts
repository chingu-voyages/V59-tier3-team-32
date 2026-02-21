import { eq, sql } from "drizzle-orm";
import { attempts } from "../attempts/attempt-schemas.js";
import { makeDb } from "../database/index.js";
import { roles } from "../quizzes/quiz-schemas.js";
import { users } from "../users/user-schemas.js";

// TODO: think about indexing (role_id, user_id)
export async function getLeaderboardRows(roleId: string) {
  return makeDb()
    .select({
      id: users.id,
      name: users.name,
      score: sql<number>`MAX(${attempts.correctCount}::float / ${attempts.questionsCount}::float)`,
    })
    .from(attempts)
    .innerJoin(users, eq(users.id, attempts.userId))
    .where(eq(attempts.roleId, roleId))
    .groupBy(users.id, users.name)
    .orderBy(
      sql<number>`MAX(${attempts.correctCount}::float / ${attempts.questionsCount}::float) DESC`,
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

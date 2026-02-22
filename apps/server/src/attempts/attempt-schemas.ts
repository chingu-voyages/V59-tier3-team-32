// TEMP: stub schema until real migrations land
// TODO: add tweaks & generate migrations on top of the real tables after rebasing
import { pgTable, smallint, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user-schemas.js";

export const attempts = pgTable("attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  roleId: text("role_id").references(() => users.id),
  correctCount: smallint("correct_count").notNull(),
  questionsCount: smallint("questions_count").notNull(),
  attemptNumber: smallint("attempt_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

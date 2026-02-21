import { pgTable, smallint, text, timestamp } from "drizzle-orm/pg-core";

// TODO import users and reference user_id and role_id from users table

export const attempts = pgTable("attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  roleId: text("role_id").notNull(),
  correctCount: smallint("correct_count"),
  questionsCount: smallint("questions_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

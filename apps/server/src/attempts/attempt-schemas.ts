import { pgTable, smallint, text, timestamp } from "drizzle-orm/pg-core";

// TODO import users and reference user_id from users table

export const attempts = pgTable("attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  quizId: text("quiz_id").notNull(),
  role: text("role").notNull(),
  correctCount: smallint("correct_count").notNull(),
  questionsCount: smallint("questions_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

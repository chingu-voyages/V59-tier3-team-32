import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const attempts = pgTable("attempts", {
  userId: text("user_id").notNull(),
  quizId: text("quiz_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  role: text("role").notNull(),
  questionsCount: integer("questions_count").notNull(),
  correctCount: integer("correct_count").notNull(),
});

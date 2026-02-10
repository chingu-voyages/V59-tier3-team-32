import { z } from "zod";

export const flashcardSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.record(z.enum(["A", "B", "C", "D"]), z.string()),
  answer: z.string(),
  rationale: z.string(),
});

export const roleSchema = z.object({
  role: z.string(),
  focus: z.string(),
  flashcards: z.array(flashcardSchema),
});

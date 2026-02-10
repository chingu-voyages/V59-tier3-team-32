"server-only";
import { z } from "zod";
import { roleSchema } from "./types";

export const getHealth = async () => {
  const res = await fetch(`${process.env.BACKEND_ORIGIN}/api/v1/health`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Health check failed");
  return res.json();
};

export const getFlashcardQuestions = async (
  role: string | string[] | undefined,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v1/flashcards?role=${role}`,
  );

  if (!res.ok) throw new Error("Unable to fetch flashcard questions");

  const data = await res.json();
  const [flashcardQuestions] = z.array(roleSchema).parse(data);

  return flashcardQuestions;
};

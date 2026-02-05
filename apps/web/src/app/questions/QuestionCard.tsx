"use client";
import { flashcardSchema } from "@/lib/types";
import z from "zod";

interface QuestionCardProps {
  flashcard: z.infer<typeof flashcardSchema>;
  currentIndex: number;
  totalQuestions: number;
  onNext: (isCorrect: boolean) => void;
}

const QuestionCard = ({
  flashcard,
  currentIndex,
  totalQuestions,
  onNext,
}: QuestionCardProps) => {
  return <div></div>;
};

export default QuestionCard;

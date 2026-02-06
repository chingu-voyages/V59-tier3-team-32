"use client";
import { roleSchema } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import QuestionCard from "./QuestionCard";

const QuestionsContainer = ({
  roleDetails,
}: {
  roleDetails: z.infer<typeof roleSchema>;
}) => {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setFinished] = useState(false);

  const totalQuestions = roleDetails.flashcards.length;

  const handleNext = (isCorrect: boolean) => {
    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (index < totalQuestions - 1) {
      setIndex(index + 1);
    } else {
    }
  };

  const progressPercentage = ((index + 1) / totalQuestions) * 100;

  return (
    <section className="mx-auto max-w-304 py-16">
      <header className="flex items-center justify-between pb-8">
        <nav className="text-2xl">
          <Link href="/">
            <ArrowLeft size={28} className="text-(--color-primary)" />
          </Link>
        </nav>
        <h1 className="text-4xl font-semibold text-(--color-primary)">
          {isFinished ? "Summary" : roleDetails.role}
        </h1>
        <span className="w-7" />
      </header>
      {!isFinished && (
        <section className="p-6 max-w-5xl mx-auto">
          <div className="flex flex-col gap-y-3">
            <div className="w-full bg-(--color-card) h-3">
              <div
                className="bg-(--color-primary-dark) h-3 rounded-sm transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-right text-(--color-secondary)">
              Questions {index + 1} / {totalQuestions}
            </p>
          </div>
        </section>
      )}

      <main className="flex items-center justify-center py-10">
        {!isFinished && (
          <QuestionCard
            key={index}
            flashcard={roleDetails.flashcards[index]}
            currentIndex={index}
            totalQuestions={totalQuestions}
            onNext={handleNext}
          />
        )}
      </main>
    </section>
  );
};

export default QuestionsContainer;

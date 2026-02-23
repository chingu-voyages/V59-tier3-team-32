"use client";
import { roleSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import QuestionCard from "./QuestionCard";
import Summary from "./Summary";

const QuestionsContainer = ({
  roleDetails,
}: {
  roleDetails: z.infer<typeof roleSchema>;
}) => {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setFinished] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFinished) e.preventDefault();
    };

    const handlePopState = () => {
      /**
       * BUG: .back() re-triggers 'popstate', causing a second confirm dialog
       * DECISION: Left as is to avoid complex history stack manipulation
       * ALTERNATIVE: We can use .go(-2) but less reliable across entry points
       */

      if (!isFinished) {
        if (confirm("You haven't completed the test. Leave anyway?")) {
          window.history.back();
        } else {
          window.history.pushState(null, "", window.location.pathname);
        }
      }
    };

    window.history.pushState(null, "", window.location.pathname);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFinished]);

  const totalQuestions = roleDetails.flashcards.length;

  const handleNext = (isCorrect: boolean) => {
    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (index < totalQuestions - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const progressPercentage = ((index + 1) / totalQuestions) * 100;

  return (
    <div className="mx-auto max-w-304 py-8 sm:py-12 md:py-16 px-8 sm-px-10">
      <header className="flex items-center justify-between pb-6 sm:pb-8">
        <nav className="text-2xl" aria-label="Page navigation">
          <Link
            href="/"
            className="flex gap-x-2 items-center"
            aria-label={isFinished ? "Back to home" : "Exit quiz"}
            onClick={(e) => {
              if (
                !isFinished &&
                !confirm("You haven't completed the test. Leave anyway?")
              ) {
                e.preventDefault();
              }
            }}
          >
            <ArrowLeft
              size={24}
              className="text-(--color-primary) sm:w-7 sm:h-7"
              aria-hidden="true"
            />
            {isFinished && (
              <span className="hidden sm:block text-xs sm:text-sm text-(--custom-gray) font-light hover:underline">
                Back to home
              </span>
            )}
          </Link>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-(--color-primary) text-center flex-1 sm:flex-none">
          {isFinished ? "Summary" : roleDetails.role}
        </h1>
        <span
          className={cn(isFinished ? "w-6 sm:w-28" : "w-6 sm:w-7")}
          aria-hidden="true"
        />
      </header>

      {!isFinished && (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
          <div className="flex flex-col gap-y-2 sm:gap-y-3">
            <div
              className="w-full bg-(--color-card) h-2 sm:h-3"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuetext={`${index + 1} of ${totalQuestions}`}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bg-(--color-primary-dark) h-2 sm:h-3 rounded-sm transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p
              className="text-right text-(--color-secondary) text-sm sm:text-base"
              aria-live="polite"
            >
              <span className="sr-only">Questions</span> {index + 1} /{" "}
              {totalQuestions}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center py-7 sm:py-8 md:py-10">
        {!isFinished ? (
          <QuestionCard
            key={index}
            flashcard={roleDetails.flashcards[index]}
            currentIndex={index}
            totalQuestions={totalQuestions}
            onNext={handleNext}
          />
        ) : (
          <Summary results={results} />
        )}
      </div>
    </div>
  );
};

export default QuestionsContainer;

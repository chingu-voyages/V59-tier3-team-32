"use client";
import BulbIcon from "@/components/icons/BulbIcon";
import { Button } from "@/components/ui/button";
import { flashcardSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const options = ["A", "B", "C", "D"];

  const handleNextClick = () => {
    onNext(selectedOption === flashcard.answer);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedOption) setIsSubmitted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // PREVENT SHORTCUTS IF USER IS TYPING IN AN INPUT
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      if (isSubmitted && key === "ENTER") handleNextClick();

      if (options.includes(key)) setSelectedOption(key);

      if (key === "ENTER" && selectedOption) setIsSubmitted(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOption, isSubmitted]);

  if (isSubmitted) {
    return (
      <article
        className="w-full max-w-4xl mx-auto px-8 py-14 bg-(--card-secondary) min-h-120 rounded-xl"
        aria-labelledby="rationale-heading"
      >
        <div className="py-18 min-h-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 pb-6">
            <h2 id="rationale-heading" className="text-2xl font-bold">
              Correct Answer:
            </h2>
            <span className="text-3xl font-bold text-(--color-primary)">
              {flashcard.answer}
            </span>
          </div>

          <p className="text-(--custom-gray) text-lg font-light tracking-wide leading-relaxed pb-8">
            {flashcard.rationale}
          </p>

          <div className="mt-auto flex justify-end">
            <Button
              onClick={handleNextClick}
              className="bg-(--color-secondary) hover:bg-(--color-primary-dark) tracking-wide px-10 py-5 font-semibold transition-colors cursor-pointer"
            >
              {currentIndex === totalQuestions - 1
                ? "View performance"
                : "Next"}
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="w-full max-w-4xl mx-auto p-13 bg-(--card-secondary) rounded-xl"
      aria-labelledby="question-title"
    >
      <div className="flex justify-between items-center pb-8">
        <h2 id="question-title" className="text-3xl font-semibold text-white">
          Question {currentIndex + 1}
        </h2>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="font-semibold text-xl">3</span>
          <BulbIcon />
        </div>
      </div>

      <p className="text-lg pb-8 tracking-wide">{flashcard.question}</p>

      <fieldset>
        <legend className="sr-only">Answer options</legend>

        <ul className="pb-8 flex flex-col gap-y-4">
          {options.map((opt) => (
            <li key={opt}>
              <label
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center gap-4 group focus-within:ring focus-within:ring-(--color-secondary)",
                  {
                    "bg-(--color-selected) border-(--color-secondary)":
                      selectedOption === opt,
                    "bg-(--color-option) border-transparent hover:bg-gray-800/75 hover:border-(--color-secondary) cursor-pointer hover:gap-6":
                      selectedOption !== opt,
                  },
                )}
              >
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                  className="sr-only"
                />
                <div
                  className="w-10 h-10 rounded-lg flex shrink-0 items-center justify-center text-lg bg-[linear-gradient(180deg,#C178FD_0%,#5F82DBB3_100%)]"
                  aria-hidden="true"
                >
                  {opt}
                </div>
                <span className="tracking-wide">
                  {flashcard.options[opt as keyof typeof flashcard.options]}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`disabled:cursor-not-allowed disabled:bg-gray-900 disabled:border-white 
            cursor-pointer bg-(--color-secondary) hover:bg-(--color-primary-dark) px-10 py-5
            text-base rounded-lg transition-colors border border-transparent`}
        >
          Submit
        </Button>
      </div>
    </article>
  );
};

export default QuestionCard;

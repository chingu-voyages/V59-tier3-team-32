"use client";
import { flashcardSchema } from "@/lib/types";
import { useState } from "react";
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

  const handleSubmit = () => {
    if (selectedOption) setIsSubmitted(true);
  };

  const handleNextClick = () => {
    onNext(selectedOption === flashcard.answer);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const options = ["A", "B", "C", "D"];

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-(--color-card)">
        <div className="bg-(--color-card) rounded-xl p-8 shadow-lg border border-white/5 min-h-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 pb-6">
            <h2 className="text-2xl font-bold text-white">Correct Answer:</h2>
            <span className="text-3xl font-bold text-[#A78BFA]">
              {flashcard.answer}
            </span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed pb-8">
            {flashcard.rationale}
          </p>

          <div className="mt-auto flex justify-end">
            <button
              onClick={handleNextClick}
              className="bg-[#A78BFA] hover:bg-[#8b5cf6] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center text-gray-400 pb-2">
        <h2 className="text-2xl font-bold text-white">
          Question {currentIndex + 1}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">3</span> 💡
        </div>
      </div>

      <p className="text-gray-200 text-lg mb-8">{flashcard.question}</p>

      <div className="pb-8 flex flex-col gap-y-4">
        {options.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedOption(key)}
            className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 group
              ${
                selectedOption === key
                  ? "bg-[#2E2350] border-[#A78BFA]"
                  : "bg-[#1a103c] border-transparent hover:bg-[#231b45]"
              }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
              ${
                selectedOption === key
                  ? "bg-[#A78BFA] text-white"
                  : "bg-[#A78BFA]/20 text-[#A78BFA] group-hover:bg-[#A78BFA] group-hover:text-white transition-colors"
              }`}
            >
              {key}
            </div>
            <span className="text-gray-200 text-lg">
              {flashcard.options[key as keyof typeof flashcard.options]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="bg-[#A78BFA] hover:bg-[#8b5cf6] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;

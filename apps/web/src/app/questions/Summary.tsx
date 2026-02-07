"use client";
import CopunIcon from "@/components/icons/CopunIcon";
import SmileyIcon from "@/components/icons/SmileyIcon";
import SmileySadIcon from "@/components/icons/SmileySadIcon";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Summary = ({ results }: { results: boolean[] }) => {
  const correctCount = results.filter(Boolean).length;
  const incorrectCount = results.length - correctCount;
  const percentage = Math.round((correctCount / results.length) * 100);

  return (
    <div>
      <header className="pb-24">
        <div className="flex items-center gap-3 pb-4">
          <span>
            <CopunIcon />
          </span>
          <h1 className="text-4xl font-bold">Interview completed!</h1>
        </div>
        <p className="tracking-wide text-lg font-light text-(--custom-gray)">
          Interview completed! Review your answers to learn from your
          performance
        </p>
      </header>

      <section className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="bg-[#0A6F4D99] rounded-xl p-8 flex flex-col items-center justify-center min-h-64">
            <span className="pb-6">
              <SmileyIcon />
            </span>
            <p className="text-2xl font-light tracking-wide text-center">
              Correct answers:{" "}
              <strong className="text-white">{correctCount}</strong>
            </p>
          </article>

          <article className="bg-[#AD404099] rounded-xl p-8 flex flex-col items-center justify-center min-h-64">
            <span className="pb-6">
              <SmileySadIcon />
            </span>
            <p className="text-2xl font-light tracking-wide text-center">
              Wrong answers:{" "}
              <strong className="text-white">{incorrectCount}</strong>
            </p>
          </article>
        </div>
      </section>

      <section className="pb-12">
        <h2 className="text-2xl font-semibold pb-4">Performance breakdown</h2>

        <div
          className="bg-slate-700/50 rounded-sm h-3 overflow-hidden border border-[#848A89]"
          role="progressbar"
        >
          <div
            className="bg-[#0D9467] h-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-6">
            <p className="text-2xl font-bold text-[#10B981]">
              Accuracy: {percentage}%
            </p>
            <p className="font-light">
              Your level: <span className="text-(--custom-gray)">Medium</span>
            </p>
          </div>

          <nav>
            <Link href="#" className="text-[#9299D6] text-lg font-bold">
              View leaderboard
            </Link>
          </nav>
        </div>
      </section>

      <aside className="flex items-center gap-4 pb-16">
        <span>
          <StarIcon />
        </span>
        <p className="text-[#848488]">
          Great job! You&apos;ve successfully completed the interview. You can
          share your score on social media.
        </p>
      </aside>

      <footer className="flex justify-end gap-4">
        <Button className="bg-transparent border border-(--color-secondary) py-5.5 hover:bg-transparent cursor-pointer">
          Share your score
        </Button>

        <Button
          asChild
          className="bg-(--color-secondary) hover:bg-(--color-primary-dark) py-5.5"
        >
          <Link href="/roles">Take another interview</Link>
        </Button>
      </footer>
    </div>
  );
};

export default Summary;

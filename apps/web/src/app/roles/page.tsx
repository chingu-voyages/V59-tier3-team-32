import { Button } from "@/components/ui/button";
import roles from "./roles";
import Link from "next/link";

export default function Roles() {
  return (
    <main className="min-h-screen bg-[#0F1425]">
      <section className="mx-auto max-w-304 px-8 py-16">
        <header>
          <h1 className="text-4xl font-semibold text-(--color-primary) pb-6 tracking-wide">
            Choose your role to start!
          </h1>
          <p className="text-white font-light max-w-3xl pb-12 leading-tight tracking-wide">
            Each role includes questions from different categories. You can
            continue by choosing the role that suits you best.
          </p>
        </header>

        <ul className="flex flex-col gap-y-6">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <li key={role.id}>
                <article className="bg-(--color-card) border border-purple-950/25 rounded-xl p-8 flex items-center gap-10 hover:border-purple-500 transition">
                  <figure className="shrink-0 w-40 h-32 relative">
                    <Icon />
                  </figure>

                  <header className="grow pt-5">
                    <h2 className="text-2xl font-semibold text-white pb-3">
                      {role.title}
                    </h2>
                    <p className="text-slate-300 font-light leading-tight max-w-md">
                      {role.description}
                    </p>
                  </header>
                  <footer className="flex flex-col gap-y-14">
                    <p className="text-right shrink-0 text-slate-300 text-lg">
                      20 Questions
                    </p>
                    <nav className="flex gap-4">
                      <Button
                        variant="outline"
                        className="py-6 cursor-pointer border-(--custom-gray) hover:text-(--custom-gray) text-(--custom-gray) hover:bg-transparent bg-transparent text-base"
                      >
                        View Leaderboard
                      </Button>
                      <Button
                        asChild
                        className="py-6 bg-(--color-secondary) cursor-pointer hover:bg-purple-700 text-white text-base"
                      >
                        <Link href={`/questions?role=${role.slug}`}>
                          Test your knowledge
                        </Link>
                      </Button>
                    </nav>
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

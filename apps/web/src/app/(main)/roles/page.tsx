import { Button } from "@/components/ui/button";
import Link from "next/link";
import roles from "./roles";

export default function Roles() {
  return (
    <div className="min-h-screen bg-[#0F1425]">
      <section className="mx-auto max-w-304 px-4 sm:px-8 py-8 sm:py-16">
        <header>
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-(--color-primary)
              pb-4 sm:pb-6 tracking-wide`}
            id="roles-heading"
          >
            Choose your role to start!
          </h1>
          <p
            className={`text-white font-light max-w-3xl pb-8 sm:pb-12 leading-tight 
            tracking-wide text-sm sm:text-base`}
          >
            Each role includes questions from different categories. You can
            continue by choosing the role that suits you best.
          </p>
        </header>

        <ul className="flex flex-col gap-y-4 sm:gap-y-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const titleId = `role-title-${role.id}`;

            return (
              <li key={role.id}>
                <article
                  className={`bg-(--color-card) border border-purple-950/25
                    rounded-xl p-4 sm:p-8 flex flex-col sm:flex-row sm:items-center
                    gap-6 sm:gap-10 hover:border-purple-500 transition`}
                  aria-labelledby={titleId}
                >
                  <div
                    className="shrink-0 w-28 h-24 sm:w-40 sm:h-32 relative"
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>

                  <header className="grow pt-12 sm:pt-5">
                    <h2
                      id={titleId}
                      className="text-lg sm:text-2xl font-semibold text-white pb-2 sm:pb-3"
                    >
                      {role.title}
                    </h2>
                    <p className="text-slate-300 font-light leading-tight max-w-md text-sm sm:text-base">
                      {role.description}
                    </p>
                  </header>
                  <div className="flex flex-col gap-y-4 sm:gap-y-14 w-full sm:w-auto">
                    <p className="text-right shrink-0 text-slate-300 text-base sm:text-lg">
                      5 Questions
                    </p>
                    <nav
                      className="flex sm:flex-col lg:flex-row gap-4"
                      aria-label={`${role.title} actions`}
                    >
                      <Button
                        variant="outline"
                        className={`flex-1 py-5 sm:py-6 cursor-pointer border-(--custom-gray) 
                          hover:text-(--custom-gray) text-(--custom-gray) hover:bg-transparent 
                          bg-transparent text-sm sm:text-base`}
                        aria-label={`View leaderboard for ${role.title}`}
                      >
                        View Leaderboard
                      </Button>
                      <Button
                        asChild
                        className={`flex-1 py-5 sm:py-6 bg-(--color-secondary) cursor-pointer
                          hover:bg-purple-700 text-white text-sm sm:text-base`}
                      >
                        <Link
                          href={`/questions?role=${role.slug}`}
                          aria-label={`Start test for ${role.title}`}
                        >
                          Test your knowledge
                        </Link>
                      </Button>
                    </nav>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

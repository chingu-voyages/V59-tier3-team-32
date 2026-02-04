import { Button } from "@/components/ui/button";
import DesignerIcon from "./DesignerIcon";

export default function Roles() {
  const roles = [
    {
      id: 1,
      title: "Product Owner",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquot odio mattis.",
    },
    {
      id: 2,
      title: "Scrum Master",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquot odio mattis.",
      questions: 20,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquot odio mattis.",
    },
    {
      id: 4,
      title: "Web Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquot odio mattis.",
    },
    {
      id: 5,
      title: "Python Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquot odio mattis.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0F1425]">
      <section className="mx-auto max-w-304 px-8 py-16">
        <h1 className="text-4xl font-semibold text-(--color-primary) pb-6 tracking-wide">
          Choose your role to start!
        </h1>
        <p className="text-white font-light max-w-3xl pb-12 leading-tight tracking-wide">
          Each role includes questions from different categories. You can
          continue by choosing the role that suits you best.
        </p>

        <div className="flex flex-col gap-y-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-(--color-card) border border-purple-950/25 rounded-xl p-8 flex items-center gap-10 hover:border-purple-500 transition"
            >
              <div className="shrink-0 w-40 h-32 relative">
                <DesignerIcon />
              </div>

              <div className="grow pt-5">
                <h2 className="text-2xl font-semibold text-white pb-3">
                  {role.title}
                </h2>
                <p className="text-slate-300 font-light leading-tight max-w-md">
                  {role.description}
                </p>
              </div>
              <div className="flex flex-col gap-y-14">
                <div className="text-right shrink-0">
                  <div className="text-slate-300 text-lg">20 Questions</div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="py-6 cursor-pointer border-(--custom-gray) hover:text-(--custom-gray) text-(--custom-gray) hover:bg-transparent bg-transparent text-base"
                  >
                    View Leaderboard
                  </Button>
                  <Button className="py-6 bg-(--color-secondary) cursor-pointer hover:bg-purple-700 text-white text-base">
                    Test your knowledge
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import { getFlashcardQuestions } from "@/lib/queries";
import { isValidRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import QuestionsContainer from "./QuestionsContainer";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const role = (await searchParams).role;

  if (typeof role !== "string" || !isValidRole(role)) {
    redirect("/roles");
  }

  const roleDetails = await getFlashcardQuestions(role);

  return (
    <main id="main-content" className="min-h-screen bg-[#0F1425] text-white">
      <QuestionsContainer roleDetails={roleDetails} />
    </main>
  );
}

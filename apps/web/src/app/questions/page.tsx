import { getFlashcardQuestions } from "@/lib/queries";
import QuestionsContainer from "./QuestionsContainer";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const role = (await searchParams).role;
  const roleDetails = await getFlashcardQuestions(role);

  return (
    <main className="min-h-screen bg-[#0F1425] text-white">
      <QuestionsContainer roleDetails={roleDetails} />
    </main>
  );
}

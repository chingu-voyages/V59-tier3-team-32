import { getFlashcardQuestions } from "@/lib/queries";
import QuestionsContainer from "./QuestionsContainer";

export default async function Questions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = searchParams.role;
  const roleDetails = await getFlashcardQuestions(role);

  return (
    <main>
      <QuestionsContainer roleDetails={roleDetails} />
    </main>
  );
}

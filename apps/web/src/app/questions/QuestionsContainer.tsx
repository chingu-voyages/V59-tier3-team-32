import { flashcardSchema, roleSchema } from "@/lib/types";
import { z } from "zod";

const QuestionsContainer = ({
  roleDetails,
}: {
  roleDetails: z.infer<typeof roleSchema>;
}) => {
  return <div></div>;
};

export default QuestionsContainer;

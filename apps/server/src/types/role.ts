type Options = {
  A: string;
  B: string;
  C: string;
  D: string;
};

type Flashcard = {
  id: number;
  question: string;
  options: Options;
  answer: string;
  rationale: string;
};

export type Role = {
  role: string;
  focus: string;
  flashcards: Flashcard[];
};

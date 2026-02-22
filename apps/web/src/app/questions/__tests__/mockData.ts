export const mockFlashcard = {
  id: 1,
  question: "What is 2+2?",
  options: { A: "3", B: "4", C: "5", D: "6" },
  answer: "B",
  rationale: "Basic math.",
};

export const mockRoleDetails = {
  role: "Nerd",
  focus: "Arithmetics",
  flashcards: [
    mockFlashcard,
    { ...mockFlashcard, id: 2, question: "Next Q", answer: "A" },
  ],
};

import QuestionsContainer from "@/app/questions/QuestionsContainer";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockRoleDetails } from "./mockData";

vi.mock("@/app/questions/QuestionCard", () => ({
  default: ({ onNext }: any) => (
    <div data-testid="question-card">
      <button onClick={() => onNext(true)}>Correct</button>
      <button onClick={() => onNext(false)}>Incorrect</button>
    </div>
  ),
}));

vi.mock("@/app/questions/Summary", () => ({
  default: ({ results }: { results: boolean[] }) => (
    <div data-testid="summary">Results: {results.length}</div>
  ),
}));

describe("QuestionsContainer", () => {
  it("advances through questions and shows summary on finish", async () => {
    render(<QuestionsContainer roleDetails={mockRoleDetails} />);

    const correctBtn = screen.getByRole("button", { name: "Correct" });
    fireEvent.click(correctBtn);

    expect(screen.getByText(/Questions 2 \/ 2/i)).toBeInTheDocument();

    const incorrectBtn = screen.getByRole("button", { name: "Incorrect" });
    fireEvent.click(incorrectBtn);

    expect(screen.getByTestId("summary")).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
  });

  it("calculates progress bar width correctly", () => {
    const { container } = render(
      <QuestionsContainer roleDetails={mockRoleDetails} />,
    );

    const progressBar = container.querySelector(
      ".bg-\\(--color-primary-dark\\)",
    );

    expect(progressBar).toHaveStyle("width: 50%");
  });
});

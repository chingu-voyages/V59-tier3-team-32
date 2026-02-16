import QuestionCard from "@/app/questions/QuestionCard";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mockFlashcard } from "./mockData";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/icons/BulbIcon", () => ({
  default: () => <svg data-testid="bulb-icon" />,
}));

describe("QuestionCard", () => {
  afterEach(cleanup);

  const setup = (onNext = vi.fn()) => {
    const user = userEvent.setup();
    const view = render(
      <QuestionCard
        flashcard={mockFlashcard}
        currentIndex={0}
        totalQuestions={5}
        onNext={onNext}
      />,
    );

    const actions = {
      selectOption: async (text: string) => {
        const option = screen.getByText(new RegExp(text, "i"));
        await user.click(option);
      },
      submit: async () =>
        await user.click(screen.getByRole("button", { name: /^submit$/i })),
      goNext: async () =>
        await user.click(
          screen.getByRole("button", { name: /next|performance/i }),
        ),
    };

    return { ...view, actions, onNext };
  };

  it("renders correctly", () => {
    setup();
    expect(screen.getByText(mockFlashcard.question)).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("toggles submit button state based on selection", async () => {
    const { actions } = setup();
    const submitBtn = screen.getByRole("button", { name: /^submit$/i });

    expect(submitBtn).toBeDisabled();
    await actions.selectOption("4");
    expect(submitBtn).toBeEnabled();
  });

  it("shows rationale and correct answer on submission", async () => {
    const { actions } = setup();

    await actions.selectOption("4");
    await actions.submit();

    expect(screen.getByText(/correct answer:/i)).toBeInTheDocument();
    expect(screen.getByText(mockFlashcard.rationale)).toBeInTheDocument();
  });

  it("emits correct result via onNext", async () => {
    const { actions, onNext } = setup();

    await actions.selectOption("4");
    await actions.submit();
    await actions.goNext();
    expect(onNext).toHaveBeenLastCalledWith(true);
  });
});

import Summary from "@/app/questions/Summary";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/icons/CopunIcon", () => ({ default: () => <div /> }));
vi.mock("@/components/icons/SmileyIcon", () => ({ default: () => <div /> }));
vi.mock("@/components/icons/SmileySadIcon", () => ({ default: () => <div /> }));
vi.mock("@/components/icons/StarIcon", () => ({ default: () => <div /> }));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("Summary", () => {
  it("calculates counts and accuracy correctly", () => {
    render(<Summary results={[true, true, true, false]} />);

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Accuracy: 75%")).toBeInTheDocument();
  });

  it("renders progress bar with correct width", () => {
    render(<Summary results={[true, true, true, false]} />);

    const progress = document.querySelector(
      '[role="progressbar"]',
    ) as HTMLElement;

    expect(progress).toBeInTheDocument();

    const fill = progress.firstElementChild as HTMLElement;
    expect(fill).toHaveStyle({ width: "75%" });
  });

  it("handles 0% accuracy", () => {
    render(<Summary results={[false, false]} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Accuracy: 0%")).toBeInTheDocument();
  });

  it("renders expected links", () => {
    render(<Summary results={[true]} />);

    const links = screen.getAllByRole("link");

    expect(links.some((l) => l.getAttribute("href") === "#")).toBe(true);

    expect(links.some((l) => l.getAttribute("href") === "/roles")).toBe(true);
  });
});

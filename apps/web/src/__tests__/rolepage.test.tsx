import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Roles from "@/app/roles/page";
import "@testing-library/jest-dom/vitest";

vi.mock("@/app/roles/DesignerIcon", () => ({
  default: () => <div data-testid="designer-icon" />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

describe("Roles Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the main heading and introduction", () => {
    render(<Roles />);
    expect(
      screen.getByRole("heading", { level: 1, name: /choose your role/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/each role includes questions/i),
    ).toBeInTheDocument();
  });

  it("renders the correct number of role cards", () => {
    render(<Roles />);
    const headings = screen.getAllByRole("heading", { name: "UI/UX Designer" });
    expect(headings).toHaveLength(4);
    expect(screen.getAllByTestId("designer-icon")).toHaveLength(4);
  });

  it("renders action buttons for each card", () => {
    render(<Roles />);
    expect(screen.getAllByText(/view leaderboard/i)).toHaveLength(4);
    expect(screen.getAllByText(/test your knowledge/i)).toHaveLength(4);
  });
});

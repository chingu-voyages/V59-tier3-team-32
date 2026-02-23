import Home from "@/app/(main)/page";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(() => {
  cleanup();
});

describe("Home page", () => {
  it("renders main sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /master your interview skills/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /why choose confido\?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /how it works \?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /explore roles/i }),
    ).toBeInTheDocument();
  });

  it("has correct CTA links", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /test your knowledge/i }),
    ).toHaveAttribute("href", "/questions");
    expect(
      screen.getByRole("link", { name: /view more roles/i }),
    ).toHaveAttribute("href", "/roles");
  });

  it("renders mapped copy", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /prepare smarter/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /insightful feedback/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /gain confidence/i, level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/choose your role/i)).toBeInTheDocument();
    expect(screen.getByText(/answer questions/i)).toBeInTheDocument();
    expect(screen.getByText(/view result/i)).toBeInTheDocument();
  });
});

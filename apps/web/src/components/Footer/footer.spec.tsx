import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Footer from "./";
import members from "./members.json";

/**
 * Structural fake for the carousel.
 * Renders children and exposes navigation buttons.
 */
vi.mock("@/components/ui/carousel", async () => {
  const React = await import("react");

  return {
    Carousel: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="carousel">{children}</div>
    ),
    CarouselContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    CarouselItem: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    CarouselPrevious: () => <button aria-label="Previous slide">Prev</button>,
    CarouselNext: () => <button aria-label="Next slide">Next</button>,
  };
});

describe("Footer", () => {
  it("renders team members with their roles and links", () => {
    render(<Footer />);

    expect(
      screen.getByRole("heading", { name: /team members/i }),
    ).toBeVisible();

    members.forEach((member) => {
      const memberLink = screen.getByRole("link", {
        name: new RegExp(member.name, "i"),
      });

      expect(memberLink).toBeVisible();
      expect(memberLink).toHaveAttribute("href", member.href);
      expect(within(memberLink).getByText(member.role)).toBeVisible();
    });
  });

  it("renders team repo link and the current year", () => {
    render(<Footer />);

    const repoLink = screen.getByRole("link", { name: /v59-tier3-team-32/i });
    expect(repoLink).toBeVisible();
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/chingu-voyages/v59-tier3-team-32",
    );

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(currentYear.toString())).toBeVisible();
  });

  it("exposes carousel navigation controls", () => {
    render(<Footer />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByRole("button", { name: /previous slide/i }),
    ).toBeVisible();

    expect(screen.getByRole("button", { name: /next slide/i })).toBeVisible();
  });
});

afterEach(() => {
  cleanup();
});

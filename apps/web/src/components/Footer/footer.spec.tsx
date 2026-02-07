import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Footer from "./";
import members from "./members.json";

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
});

afterEach(() => {
  cleanup();
});

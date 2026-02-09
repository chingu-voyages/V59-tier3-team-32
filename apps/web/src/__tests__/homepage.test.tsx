import Home from "@/app/(main)/page";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test('Home renders "Howdy"', () => {
  render(<Home />);
  expect(screen.getByText("Howdy")).toBeDefined();
});

import Header from "@/components/header";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Header", () => {
  test("Home is active on /", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);
    const homeLink = screen.getByText("Home");
    const rolesLink = screen.getByText("Roles");
    expect(homeLink.className).toContain("text-primary");
    expect(rolesLink.className).not.toMatch(/(?<![:\w])text-primary/);
  });

  test("roles is active on /roles", () => {
    mockUsePathname.mockReturnValue("/roles");
    render(<Header />);
    const testsLink = screen.getByText("Roles");
    const homeLink = screen.getByText("Home");
    expect(testsLink.className).toContain("text-primary");
    expect(homeLink.className).not.toMatch(/(?<![:\w])text-primary/);
  });

  test("renders auth links", () => {
    render(<Header />);
    expect(screen.getByText("Login")).toBeDefined();
    expect(screen.getByText("Sign Up")).toBeDefined();
  });

  test("renders current date", () => {
    render(<Header />);
    const now: Date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = now.toLocaleDateString("en-us", options);
    expect(screen.getByText(formattedDate)).toBeDefined();
  });
});
